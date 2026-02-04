'use client';

import { Flame } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { mockStreakData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakTracker() {
  const { currentStreak, weekData } = mockStreakData;

  return (
    <Card padding="lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-heading-2 text-primary">Streak</h3>
        <Flame className="w-5 h-5 text-accent-primary" />
      </div>

      {/* Streak Count */}
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-accent-primary mb-2">
          {currentStreak}
        </p>
        <p className="text-body-sm text-secondary">days productive</p>
      </div>

      {/* Week Visualization */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {weekData.map((completed, index) => {
            const isToday = index === new Date().getDay() - 1; // Adjust for Monday start
            
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full transition-smooth',
                    completed && 'bg-accent-primary',
                    !completed && isToday && 'border-2 border-accent-primary bg-transparent',
                    !completed && !isToday && 'border-2 border-light-border dark:border-dark-border bg-transparent'
                  )}
                />
                <span className="text-caption text-tertiary">{DAYS[index]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Text */}
      <p className="text-body-sm text-tertiary text-center mt-6">
        Keep it up! You&apos;re on fire 🔥
      </p>
    </Card>
  );
}