'use client';

import { useState } from 'react';
import { TrendingUp, CheckCircle2, Clock, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DayStats {
  day: string;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
}

export default function WeeklySummaryPage() {
  const [weekOffset, setWeekOffset] = useState(0);

  // Mock data - replace with real data fetching
  const weeklyStats: DayStats[] = [
    { day: 'Mon', tasksCompleted: 8, totalTasks: 10, focusMinutes: 180 },
    { day: 'Tue', tasksCompleted: 6, totalTasks: 8, focusMinutes: 150 },
    { day: 'Wed', tasksCompleted: 9, totalTasks: 12, focusMinutes: 210 },
    { day: 'Thu', tasksCompleted: 7, totalTasks: 9, focusMinutes: 165 },
    { day: 'Fri', tasksCompleted: 10, totalTasks: 11, focusMinutes: 240 },
    { day: 'Sat', tasksCompleted: 4, totalTasks: 5, focusMinutes: 90 },
    { day: 'Sun', tasksCompleted: 3, totalTasks: 4, focusMinutes: 60 },
  ];

  const totalCompleted = weeklyStats.reduce((sum, day) => sum + day.tasksCompleted, 0);
  const totalTasks = weeklyStats.reduce((sum, day) => sum + day.totalTasks, 0);
  const totalFocusMinutes = weeklyStats.reduce((sum, day) => sum + day.focusMinutes, 0);
  const completionRate = Math.round((totalCompleted / totalTasks) * 100);

  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-standard mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-body-sm">Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-heading-1 text-primary font-bold mb-2">Weekly Summary</h1>
              <p className="text-body-regular text-secondary">Your productivity insights for the week</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWeekOffset(weekOffset - 1)}
                className="px-4 py-2 bg-secondary border border-color rounded-lg text-body-sm text-primary hover:bg-tertiary transition-smooth"
              >
                Previous Week
              </button>
              <div className="text-body-regular text-primary font-medium">
                {getWeekRange()}
              </div>
              <button
                onClick={() => setWeekOffset(weekOffset + 1)}
                disabled={weekOffset >= 0}
                className="px-4 py-2 bg-secondary border border-color rounded-lg text-body-sm text-primary hover:bg-tertiary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Week
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-secondary border border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
            <div className="text-heading-2 text-primary font-bold mb-1">{totalCompleted}</div>
            <div className="text-body-sm text-secondary">Tasks Completed</div>
            <div className="mt-2 text-body-xs text-tertiary">Out of {totalTasks} total</div>
          </div>

          <div className="bg-secondary border border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-status-success/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-status-success" />
              </div>
            </div>
            <div className="text-heading-2 text-primary font-bold mb-1">{completionRate}%</div>
            <div className="text-body-sm text-secondary">Completion Rate</div>
            <div className="mt-2 text-body-xs text-status-success">+5% from last week</div>
          </div>

          <div className="bg-secondary border border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-secondary" />
              </div>
            </div>
            <div className="text-heading-2 text-primary font-bold mb-1">
              {Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m
            </div>
            <div className="text-body-sm text-secondary">Focus Time</div>
            <div className="mt-2 text-body-xs text-tertiary">Avg {Math.round(totalFocusMinutes / 7)}m/day</div>
          </div>

          <div className="bg-secondary border border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-status-warning" />
              </div>
            </div>
            <div className="text-heading-2 text-primary font-bold mb-1">
              {Math.max(...weeklyStats.map(d => d.tasksCompleted))}
            </div>
            <div className="text-body-sm text-secondary">Most Productive Day</div>
            <div className="mt-2 text-body-xs text-tertiary">
              {weeklyStats.find(d => d.tasksCompleted === Math.max(...weeklyStats.map(d => d.tasksCompleted)))?.day}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task Completion Chart */}
          <div className="bg-secondary border border-color rounded-xl p-6">
            <h2 className="text-heading-3 text-primary font-semibold mb-6">Daily Task Completion</h2>
            <div className="space-y-4">
              {weeklyStats.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body-sm text-secondary font-medium">{day.day}</span>
                    <span className="text-body-sm text-tertiary">
                      {day.tasksCompleted}/{day.totalTasks}
                    </span>
                  </div>
                  <div className="relative h-2 bg-tertiary rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-accent-primary rounded-full transition-all duration-500"
                      style={{ width: `${(day.tasksCompleted / day.totalTasks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Time Chart */}
          <div className="bg-secondary border border-color rounded-xl p-6">
            <h2 className="text-heading-3 text-primary font-semibold mb-6">Daily Focus Time</h2>
            <div className="flex items-end justify-between h-64 gap-2">
              {weeklyStats.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-tertiary rounded-t-lg relative" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-linear-to-t from-accent-secondary to-accent-secondary/60 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(day.focusMinutes / 240) * 100}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-body-xs text-primary font-medium">{day.day}</div>
                    <div className="text-body-xs text-tertiary">{day.focusMinutes}m</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-secondary border border-color rounded-xl p-6">
          <h2 className="text-heading-3 text-primary font-semibold mb-4">Weekly Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-tertiary rounded-lg p-4">
              <div className="text-body-sm text-accent-primary font-medium mb-2">🎯 Best Performance</div>
              <p className="text-body-sm text-secondary">
                You completed {Math.max(...weeklyStats.map(d => d.tasksCompleted))} tasks on your most productive day. Keep up the momentum!
              </p>
            </div>
            <div className="bg-tertiary rounded-lg p-4">
              <div className="text-body-sm text-accent-secondary font-medium mb-2">⏰ Focus Pattern</div>
              <p className="text-body-sm text-secondary">
                Your average focus time is {Math.round(totalFocusMinutes / 7)} minutes per day. Consider extending sessions for deeper work.
              </p>
            </div>
            <div className="bg-tertiary rounded-lg p-4">
              <div className="text-body-sm text-status-success font-medium mb-2">📈 Growth</div>
              <p className="text-body-sm text-secondary">
                You&apos;re {completionRate}% efficient this week. That&apos;s a {completionRate > 80 ? 'great' : 'good'} completion rate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}