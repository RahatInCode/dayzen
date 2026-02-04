'use client';

import { useState } from 'react';
import { Plus, List, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '@/types';
import { TaskItem } from './TaskItem';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockTasks } from '@/lib/mock-data';
import toast from 'react-hot-toast';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [view, setView] = useState<'list' | 'timeline'>('list');

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success('Task updated!');
  };

  const handleAddTask = () => {
    toast('Add task functionality - integrate your backend here!', {
      icon: '✏️',
    });
  };

  return (
    <Card padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-1 text-primary">Today&apos;s Tasks</h2>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-tertiary rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={cn(
                'px-3 py-1.5 rounded-md text-body-sm font-medium transition-standard',
                view === 'list'
                  ? 'bg-secondary text-primary shadow-sm'
                  : 'text-secondary hover:text-primary'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('timeline')}
              className={cn(
                'px-3 py-1.5 rounded-md text-body-sm font-medium transition-standard',
                view === 'timeline'
                  ? 'bg-secondary text-primary shadow-sm'
                  : 'text-secondary hover:text-primary'
              )}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <Button onClick={handleAddTask} size="md">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-10 h-10 text-tertiary" />
            </div>
            <h3 className="text-heading-2 text-primary mb-2">No tasks yet</h3>
            <p className="text-body-regular text-secondary mb-4">
              Create your first task to get started
            </p>
            <Button onClick={handleAddTask}>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
          ))
        )}
      </div>
    </Card>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}