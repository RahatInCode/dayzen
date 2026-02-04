'use client';

import { useState } from 'react';
import { ChevronLeft, Lightbulb, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { mockAISuggestions, mockDailySummary } from '@/lib/mock-data';
import toast from 'react-hot-toast';

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddSuggestion = (title: string) => {
    toast.success(`Added: ${title}`);
  };

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-secondary border-r border-color h-[calc(100vh-4rem)] sticky top-16 flex flex-col items-center py-6 gap-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-10 h-10 rounded-lg bg-tertiary hover:bg-light-border dark:hover:bg-dark-border
                   flex items-center justify-center transition-smooth"
        >
          <ChevronLeft className="w-5 h-5 text-secondary rotate-180" />
        </button>
        <Lightbulb className="w-6 h-6 text-accent-primary" />
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-secondary border-r border-color h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-heading-2 text-primary">AI Assistant</h2>
          <button
            onClick={() => setIsCollapsed(true)}
            className="w-8 h-8 rounded-lg hover:bg-tertiary flex items-center justify-center transition-smooth"
          >
            <ChevronLeft className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* AI Suggestions */}
        <div>
          <p className="text-caption text-tertiary uppercase tracking-wide mb-3">
            Suggested for Today
          </p>
          <div className="space-y-3">
            {mockAISuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                padding="md"
                hover
                className="bg-tertiary cursor-pointer animate-fade-in"
              >
                <div className="flex gap-3">
                  <Lightbulb className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5 animate-pulse-gentle" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-regular text-primary font-medium mb-1 line-clamp-2">
                      {suggestion.title}
                    </p>
                    <p className="text-body-sm text-secondary line-clamp-2 mb-3">
                      {suggestion.description}
                    </p>
                    <button
                      onClick={() => handleAddSuggestion(suggestion.title)}
                      className="text-body-sm text-accent-primary hover:text-accent-hover font-medium"
                    >
                      {suggestion.actionLabel} →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Summary */}
        <Card padding="lg" className="bg-gradient-to-br from-accent-light to-transparent border border-accent-primary/20">
          <h3 className="text-heading-2 text-primary mb-4">Today at a Glance</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                <span className="text-body-sm text-secondary">Tasks Done</span>
              </div>
              <p className="text-heading-1 text-primary">
                {mockDailySummary.tasksCompleted}/{mockDailySummary.totalTasks}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-accent-primary" />
                <span className="text-body-sm text-secondary">Focus Time</span>
              </div>
              <p className="text-heading-1 text-primary">{mockDailySummary.focusTime}</p>
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-accent-primary" />
                <span className="text-body-sm text-secondary">Priority Score</span>
              </div>
              <p className="text-heading-1 text-primary">{mockDailySummary.priorityScore}%</p>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}