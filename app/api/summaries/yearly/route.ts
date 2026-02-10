// app/api/summaries/yearly/route.ts
// API route for fetching yearly summary data

import { NextRequest, NextResponse } from 'next/server';
import { YearlySummary, MonthStat, Achievement, Category } from '../../../../types/summaries';

// --- Types ---

interface YearlyTotals {
  tasksCompleted: number;
  focusHours: number;
  avgCompletionRate: number;
}

// --- Route Handler ---

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

    const monthlyStats = generateMonthlyStats();
    const achievements = getAchievements(year);  // Fix 1: removed unnecessary async
    const categories = calculateCategories();     // Fix 2: removed unused `year` param

    // Fix 3: guard against empty monthlyStats to avoid division by zero
    const avgCompletionRate =
      monthlyStats.length > 0
        ? Math.round(
            monthlyStats.reduce((sum, m) => sum + m.completionRate, 0) / monthlyStats.length
          )
        : 0;

    const totals: YearlyTotals = {
      tasksCompleted: monthlyStats.reduce((sum, m) => sum + m.tasksCompleted, 0),
      focusHours: monthlyStats.reduce((sum, m) => sum + m.focusHours, 0),
      avgCompletionRate,
    };

    const highlights = generateHighlights(monthlyStats);

    const summary: YearlySummary = {
      year,
      monthlyStats,
      achievements,
      categories,
      totals,
      highlights,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching yearly summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yearly summary' },
      { status: 500 }
    );
  }
}

// --- Helper Functions ---

// Fix 4: removed unused `index` parameter from map callback
function generateMonthlyStats(): MonthStat[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // In production, query actual data from database per month:
  // Example: return Promise.all(months.map((_, i) => getTasksForMonth(year, i)));

  return months.map((month) => ({   // Fix 4: removed unused `index`
    month,
    tasksCompleted: Math.floor(Math.random() * 50) + 100,
    focusHours: Math.floor(Math.random() * 20) + 40,
    completionRate: Math.floor(Math.random() * 15) + 75,
  }));
}

// Fix 1: removed `async` since there are no `await` expressions inside
function getAchievements(year: number): Achievement[] {
  // In production, query from database:
  // Example: return db.achievements.findMany({ where: { userId, year } });

  return [
    {
      id: 'century-club',
      icon: '🏆',
      title: 'Century Club',
      description: 'Completed 100+ tasks in 8 months',
      unlockedDate: `${year}-05-15`,
      color: 'bg-accent-primary/10 text-accent-primary',
    },
    {
      id: 'streak-master',
      icon: '🔥',
      title: '30-Day Streak',
      description: 'Longest consecutive days active',
      unlockedDate: `${year}-06-20`,
      color: 'bg-status-danger/10 text-status-danger',
    },
    {
      id: 'speed-demon',
      icon: '⚡',
      title: 'Speed Demon',
      description: 'Average 12 tasks per day',
      unlockedDate: `${year}-04-10`,
      color: 'bg-status-warning/10 text-status-warning',
    },
    {
      id: 'precision-pro',
      icon: '🎯',
      title: 'Precision Pro',
      description: '85%+ completion rate',
      unlockedDate: `${year}-07-01`,
      color: 'bg-status-success/10 text-status-success',
    },
    {
      id: 'knowledge-seeker',
      icon: '📚',
      title: 'Knowledge Seeker',
      description: 'Completed 50+ learning tasks',
      unlockedDate: `${year}-08-15`,
      color: 'bg-accent-secondary/10 text-accent-secondary',
    },
    {
      id: 'early-bird',
      icon: '🌟',
      title: 'Early Bird',
      description: 'Most productive in mornings',
      unlockedDate: `${year}-09-01`,
      color: 'bg-status-info/10 text-status-info',
    },
  ];
}

// Fix 2: removed unused `year` parameter
function calculateCategories(): Category[] {
  // In production, aggregate from database:
  // Example: return db.tasks.groupBy({ by: ['category'], _count: true, where: { year } });

  return [
    { name: 'Work Projects', count: 486, percentage: 34 },
    { name: 'Personal Development', count: 312, percentage: 22 },
    { name: 'Health & Fitness', count: 275, percentage: 19 },
    { name: 'Creative Work', count: 198, percentage: 14 },
    { name: 'Others', count: 159, percentage: 11 },
  ];
}

// Fix 5: replaced `any` types with proper typed interfaces
// Fix 6: guarded against division by zero when firstHalf === 0
function generateHighlights(monthlyStats: MonthStat[]) {
  const bestMonth = monthlyStats.reduce((max, month) =>
    month.tasksCompleted > max.tasksCompleted ? month : max
  );

  const firstHalf = monthlyStats.slice(0, 6).reduce((sum, m) => sum + m.tasksCompleted, 0);
  const secondHalf = monthlyStats.slice(6).reduce((sum, m) => sum + m.tasksCompleted, 0);

  // Fix 6: guard against division by zero if firstHalf is 0
  const growth =
    firstHalf > 0
      ? Math.round(((secondHalf - firstHalf) / firstHalf) * 100)
      : secondHalf > 0
      ? 100
      : 0;

  const consistentMonths = monthlyStats.filter((m) => m.completionRate >= 80).length;

  return {
    mostProductiveMonth: `${bestMonth.month} with ${bestMonth.tasksCompleted} tasks completed`,
    biggestGrowth: `${growth > 0 ? '+' : ''}${growth}% growth from H1 to H2`,
    consistencyRecord: `Maintained 80%+ completion rate for ${consistentMonths} out of 12 months`,
  };
}