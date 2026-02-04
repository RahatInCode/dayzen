'use client';

import { TaskList } from '@/components/dashboard/TaskList';
import { CalendarMini } from '@/components/dashboard/CalendarMini';
import { AISuggestionBlock } from '@/components/dashboard/AISuggestionBlock';
import { getGreeting, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const userName = 'Alex'; // Get from auth context later
  const greeting = getGreeting();
  const today = formatDate(new Date());

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-display-lg text-primary mb-2">
          {greeting}, {userName}
        </h1>
        <p className="text-body-lg text-secondary">{today}</p>
      </header>

      {/* AI Suggestion Block */}
      <AISuggestionBlock />

      {/* Task List */}
      <TaskList />

      {/* Calendar */}
      <CalendarMini />
    </div>
  );
}