'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Const assertions for type safety
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

// Proper TypeScript interface
interface DayCell {
  day: number | string;
  isCurrentMonth: boolean;
  hasEvents: boolean;
  isToday: boolean;
}

// Return type explicitly defined
export function CalendarMini() {
  // Properly typed state
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Memoized calendar data to prevent recalculation
  const calendarData = useMemo(() => {
    const now = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const isViewingCurrentMonth = todayMonth === month && todayYear === year;

    // Deterministic pseudo-random generator based on a seed string to avoid impure Math.random during render
    const seededRandom = (seedStr: string): number => {
      // FNV-1a 32-bit hash to produce a stable number for a given seed string
      let h = 2166136261 >>> 0;
      for (let i = 0; i < seedStr.length; i++) {
        h ^= seedStr.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
      }
      // Normalize to [0, 1)
      return (h >>> 0) / 4294967296;
    };

    const days: DayCell[] = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: '',
        isCurrentMonth: false,
        hasEvents: false,
        isToday: false,
      });
    }

    // Add all days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const seed = `${year}-${month}-${i}`;
      days.push({
        day: i,
        isCurrentMonth: true,
        hasEvents: seededRandom(seed) > 0.7, // Deterministic "random" events
        isToday: isViewingCurrentMonth && i === today,
      });
    }

    return {
      days,
      year,
      month,
    };
  }, [currentDate]); // Only dependency is currentDate

  // Type-safe event handlers
  const handlePreviousMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getTime()); // Clone to avoid mutation
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getTime()); // Clone to avoid mutation
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <Card padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-2 text-primary">
          {MONTHS[calendarData.month]} {calendarData.year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="w-8 h-8 rounded-md hover:bg-tertiary flex items-center justify-center transition-smooth"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-secondary" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-md hover:bg-tertiary flex items-center justify-center transition-smooth"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-secondary" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {DAYS.map((day) => (
          <div
            key={`header-${day}`}
            className="text-caption text-tertiary uppercase text-center py-2"
          >
            {day}
          </div>
        ))}

        {/* Date Cells */}
        {calendarData.days.map((item, index) => {
          const dateLabel =
            item.isCurrentMonth && typeof item.day === 'number'
              ? `${MONTHS[calendarData.month]} ${item.day}, ${calendarData.year}`
              : undefined;

          return (
            <div
              key={`day-cell-${index}`}
              className={cn(
                'aspect-square flex flex-col items-center justify-center rounded-md text-body-regular transition-smooth relative',
                item.isCurrentMonth
                  ? 'text-primary hover:bg-tertiary cursor-pointer'
                  : 'text-tertiary',
                item.isToday && 'bg-accent-primary text-white hover:bg-accent-hover'
              )}
              role={item.isCurrentMonth ? 'button' : undefined}
              tabIndex={item.isCurrentMonth ? 0 : -1}
              aria-label={dateLabel}
            >
              {item.day}
              {item.hasEvents && item.isCurrentMonth && (
                <span
                  className={cn(
                    'w-1 h-1 rounded-full absolute bottom-1',
                    item.isToday ? 'bg-white' : 'bg-accent-primary'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}