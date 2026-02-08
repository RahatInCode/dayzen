// app/api/summaries/weekly/route.ts
// Example API route for fetching weekly summary data

import { NextRequest, NextResponse } from 'next/server';
import { WeeklySummary } from '@/types/summaries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const weekOffset = parseInt(searchParams.get('offset') || '0');
    
    // In a real application, you would:
    // 1. Get the user ID from authentication
    // 2. Query your database for the user's tasks
    // 3. Calculate statistics for the requested week
    
    // Example: const userId = await getUserIdFromAuth(request);
    // Example: const tasks = await db.tasks.findMany({ where: { userId, date: { gte: startOfWeek, lte: endOfWeek } } });
    
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Mock data - replace with actual database query
    const dailyStats = generateDailyStats(startOfWeek);
    
    const totals = dailyStats.reduce(
      (acc, day) => ({
        tasksCompleted: acc.tasksCompleted + day.tasksCompleted,
        totalTasks: acc.totalTasks + day.totalTasks,
        focusMinutes: acc.focusMinutes + day.focusMinutes,
        completionRate: 0,
      }),
      { tasksCompleted: 0, totalTasks: 0, focusMinutes: 0, completionRate: 0 }
    );

    totals.completionRate = Math.round((totals.tasksCompleted / totals.totalTasks) * 100);

    const summary: WeeklySummary = {
      weekRange: {
        start: startOfWeek.toISOString(),
        end: endOfWeek.toISOString(),
      },
      dailyStats,
      totals,
      insights: generateInsights(dailyStats, totals),
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching weekly summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly summary' },
      { status: 500 }
    );
  }
}

// Helper function to generate daily stats
function generateDailyStats(startOfWeek: Date) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index + 1);
    
    // In production, query actual data from database
    // Example: const tasks = await getTasksForDate(date);
    
    return {
      day,
      date,
      tasksCompleted: Math.floor(Math.random() * 8) + 3,
      totalTasks: Math.floor(Math.random() * 5) + 8,
      focusMinutes: Math.floor(Math.random() * 120) + 60,
    };
  });
}

// Helper function to generate insights
interface DailyStat {
  day: string;
  date: Date;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
}

interface Totals {
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
  completionRate: number;
}

function generateInsights(dailyStats: DailyStat[], totals: Totals): string[] {
  const insights: string[] = [];
  
  const mostProductiveDay = dailyStats.reduce((max, day) => 
    day.tasksCompleted > max.tasksCompleted ? day : max
  );
  
  insights.push(`Your most productive day was ${mostProductiveDay.day} with ${mostProductiveDay.tasksCompleted} tasks completed.`);
  
  const avgFocusTime = Math.round(totals.focusMinutes / 7);
  if (avgFocusTime < 90) {
    insights.push(`Your average focus time is ${avgFocusTime} minutes. Consider extending sessions for deeper work.`);
  } else {
    insights.push(`Great focus! You averaged ${avgFocusTime} minutes of focused work per day.`);
  }
  
  if (totals.completionRate >= 85) {
    insights.push(`Excellent completion rate of ${totals.completionRate}%! Keep up the momentum.`);
  } else if (totals.completionRate >= 70) {
    insights.push(`Good completion rate of ${totals.completionRate}%. A few more wins and you'll hit excellence!`);
  } else {
    insights.push(`Your completion rate is ${totals.completionRate}%. Consider breaking tasks into smaller chunks.`);
  }
  
  return insights;
}