'use client';

import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export function AISuggestionBlock() {
  const handleReorder = () => {
    toast.success('Tasks reordered based on AI suggestion!');
  };

  const handleDismiss = () => {
    toast('Suggestion dismissed');
  };

  return (
    <div className="relative bg-gradient-to-r from-accent-light to-transparent 
                  dark:from-accent-dark-light dark:to-transparent
                  border border-accent-primary/40 rounded-xl p-5 animate-fade-in">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 text-tertiary hover:text-secondary transition-standard"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Sparkles className="w-6 h-6 text-accent-primary animate-pulse-gentle" />
        </div>

        <div className="flex-1">
          <h4 className="text-body-lg font-semibold text-primary mb-2">
            AI Suggestion
          </h4>
          <p className="text-body-regular text-secondary mb-4">
            You have 3 high-priority tasks due today. Consider focusing on Design Dashboard 
            first—it&apos;s blocking 2 other tasks.
          </p>

          <div className="flex items-center gap-3">
            <Button onClick={handleReorder} size="sm">
              Reorder Tasks
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm">
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}