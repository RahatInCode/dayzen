// lib/api/summaries.ts
// Example API integration for summary pages

// Type definitions
interface DayStats {
  day: string;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
}

interface MonthStats {
  month: string;
  tasksCompleted: number;
  focusHours: number;
  completionRate: number;
}

interface Achievement {
  id?: string;
  name?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Fetch weekly summary data
 * @param weekOffset - Number of weeks from current week (negative for past, 0 for current)
 */
export async function fetchWeeklySummary(weekOffset: number = 0): Promise<{
  weekRange: { start: string; end: string };
  dailyStats: DayStats[];
  totals: {
    tasksCompleted: number;
    totalTasks: number;
    focusMinutes: number;
    completionRate: number;
  };
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/weekly?offset=${weekOffset}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weekly summary');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weekly summary:', error);
    // Return mock data as fallback
    return getMockWeeklySummary(weekOffset);
  }
}

/**
 * Fetch yearly summary data
 * @param year - Year to fetch data for
 */
export async function fetchYearlySummary(year: number): Promise<{
  year: number;
  monthlyStats: MonthStats[];
  achievements: Achievement[];
  categories: {
    name: string;
    count: number;
    percentage: number;
  }[];
  totals: {
    tasksCompleted: number;
    focusHours: number;
    avgCompletionRate: number;
  };
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/summaries/yearly?year=${year}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch yearly summary');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching yearly summary:', error);
    // Return mock data as fallback
    return getMockYearlySummary(year);
  }
}

/**
 * Export summary data as PDF or CSV
 */
export async function exportSummary(
  type: 'weekly' | 'yearly',
  format: 'pdf' | 'csv',
  params: { weekOffset?: number; year?: number }
): Promise<Blob> {
  const queryParams = new URLSearchParams({
    type,
    format,
    ...(params.weekOffset !== undefined && { weekOffset: params.weekOffset.toString() }),
    ...(params.year !== undefined && { year: params.year.toString() }),
  });

  const response = await fetch(`${API_BASE_URL}/summaries/export?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to export summary');
  }
  
  return await response.blob();
}

/**
 * Fetch user achievements
 */
export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/achievements`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

// Mock data fallbacks
function getMockWeeklySummary(weekOffset: number) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const dailyStats: DayStats[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
    day,
    tasksCompleted: Math.floor(Math.random() * 8) + 3,
    totalTasks: Math.floor(Math.random() * 5) + 8,
    focusMinutes: Math.floor(Math.random() * 120) + 60,
  }));

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

  return {
    weekRange: {
      start: startOfWeek.toISOString(),
      end: endOfWeek.toISOString(),
    },
    dailyStats,
    totals,
  };
}

function getMockYearlySummary(year: number) {
  const monthlyStats: MonthStats[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map((month) => ({
    month,
    tasksCompleted: Math.floor(Math.random() * 50) + 100,
    focusHours: Math.floor(Math.random() * 20) + 40,
    completionRate: Math.floor(Math.random() * 15) + 75,
  }));

  return {
    year,
    monthlyStats,
    achievements: [],
    categories: [
      { name: 'Work Projects', count: 486, percentage: 34 },
      { name: 'Personal Development', count: 312, percentage: 22 },
      { name: 'Health & Fitness', count: 275, percentage: 19 },
      { name: 'Creative Work', count: 198, percentage: 14 },
      { name: 'Others', count: 159, percentage: 11 },
    ],
    totals: {
      tasksCompleted: monthlyStats.reduce((sum, m) => sum + m.tasksCompleted, 0),
      focusHours: monthlyStats.reduce((sum, m) => sum + m.focusHours, 0),
      avgCompletionRate: Math.round(
        monthlyStats.reduce((sum, m) => sum + m.completionRate, 0) / monthlyStats.length
      ),
    },
  };
}

// Real-time data hooks (for use with React Query or SWR)
export const summaryKeys = {
  weekly: (offset: number) => ['summary', 'weekly', offset] as const,
  yearly: (year: number) => ['summary', 'yearly', year] as const,
  achievements: () => ['achievements'] as const,
};