// app/api/summaries/yearly/route.ts
// Example API route for fetching yearly summary data

import { NextRequest, NextResponse } from 'next/server';
import { YearlySummary } from '../../../../types/summaries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    
    // In a real application, you would:
    // 1. Get the user ID from authentication
    // 2. Query your database for the user's tasks for the entire year
    // 3. Calculate monthly statistics and achievements
    
    // Example: const userId = await getUserIdFromAuth(request);
    // Example: const tasks = await db.tasks.findMany({ where: { userId, year } });
    
    const monthlyStats = generateMonthlyStats(year);
    const achievements = await getAchievements(year);
    const categories = calculateCategories(year);
    
    const totals = {
      tasksCompleted: monthlyStats.reduce((sum, m) => sum + m.tasksCompleted, 0),
      focusHours: monthlyStats.reduce((sum, m) => sum + m.focusHours, 0),
      avgCompletionRate: Math.round(
        monthlyStats.reduce((sum, m) => sum + m.completionRate, 0) / monthlyStats.length
      ),
    };

    const highlights = generateHighlights(monthlyStats, totals);

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

// Helper function to generate monthly stats
function generateMonthlyStats(year: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, index) => {
    // In production, query actual data from database
    // Example: const tasks = await getTasksForMonth(year, index);
    
    return {
      month,
      tasksCompleted: Math.floor(Math.random() * 50) + 100,
      focusHours: Math.floor(Math.random() * 20) + 40,
      completionRate: Math.floor(Math.random() * 15) + 75,
    };
  });
}

// Helper function to get achievements
async function getAchievements(year: number) {
  // In production, query from database based on user's actual accomplishments
  // Example: const achievements = await db.achievements.findMany({ where: { userId, year } });
  
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

// Helper function to calculate category distribution
function calculateCategories(year: number) {
  // In production, aggregate from database
  // Example: const categories = await db.tasks.groupBy({ by: ['category'], _count: true, where: { year } });
  
  return [
    { name: 'Work Projects', count: 486, percentage: 34 },
    { name: 'Personal Development', count: 312, percentage: 22 },
    { name: 'Health & Fitness', count: 275, percentage: 19 },
    { name: 'Creative Work', count: 198, percentage: 14 },
    { name: 'Others', count: 159, percentage: 11 },
  ];
}

// Helper function to generate highlights
function generateHighlights(monthlyStats: any[], totals: any) {
  const bestMonth = monthlyStats.reduce((max, month) => 
    month.tasksCompleted > max.tasksCompleted ? month : max
  );
  
  const firstHalf = monthlyStats.slice(0, 6).reduce((sum, m) => sum + m.tasksCompleted, 0);
  const secondHalf = monthlyStats.slice(6).reduce((sum, m) => sum + m.tasksCompleted, 0);
  const growth = Math.round(((secondHalf - firstHalf) / firstHalf) * 100);
  
  const consistentMonths = monthlyStats.filter(m => m.completionRate >= 80).length;

  return {
    mostProductiveMonth: `${bestMonth.month} with ${bestMonth.tasksCompleted} tasks completed`,
    biggestGrowth: `${growth > 0 ? '+' : ''}${growth}% growth from H1 to H2`,
    consistencyRecord: `Maintained 80%+ completion rate for ${consistentMonths} out of 12 months`,
  };
}