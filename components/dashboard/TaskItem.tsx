'use client';

import { GripVertical, MoreVertical, Circle, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const priorityColors = {
    high: 'border-l-status-danger bg-red-50 dark:bg-red-950/20',
    medium: 'border-l-status-warning bg-amber-50 dark:bg-amber-950/20',
    low: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20',
  };

  const priorityBadgeColors = {
    high: 'bg-status-danger/10 text-status-danger dark:bg-status-danger-dark/20 dark:text-status-danger-dark',
    medium: 'bg-status-warning/10 text-status-warning dark:bg-status-warning-dark/20 dark:text-status-warning-dark',
    low: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  };

  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 p-4 rounded-lg border-l-4 transition-smooth',
        'hover:shadow-md cursor-pointer',
        task.completed && 'opacity-60',
        priorityColors[task.priority]
      )}
    >
      {/* Drag Handle */}
      <button className="opacity-0 group-hover:opacity-100 transition-standard cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-tertiary" />
      </button>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 transition-standard hover:scale-110"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-status-success" />
        ) : (
          <Circle className="w-5 h-5 text-tertiary hover:text-accent-primary" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-body-lg text-primary mb-1 line-clamp-2',
            task.completed && 'line-through'
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {task.estimatedTime && (
            <span className="text-body-sm text-secondary">{task.estimatedTime}</span>
          )}
          {task.category && (
            <span className="text-body-sm text-tertiary">• {task.category}</span>
          )}
        </div>
      </div>

      {/* Priority Badge */}
      <span
        className={cn(
          'px-2.5 py-1 rounded-full text-caption uppercase font-semibold',
          priorityBadgeColors[task.priority]
        )}
      >
        {task.priority}
      </span>

      {/* Time */}
      {task.scheduledTime && (
        <span className="text-body-sm text-tertiary whitespace-nowrap">
          {task.scheduledTime}
        </span>
      )}

      {/* More Menu */}
      <button
        onClick={() => toast('More options coming soon!')}
        className="opacity-0 group-hover:opacity-100 transition-standard p-1 hover:bg-tertiary rounded"
      >
        <MoreVertical className="w-4 h-4 text-secondary" />
      </button>
    </div>
  );
}