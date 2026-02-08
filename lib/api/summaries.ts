// types/summaries.ts
// Type definitions for summary pages

export interface DayStats {
  day: string;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
  date?: Date;
}

export interface MonthStats {
  month: string;
  tasksCompleted: number;
  focusHours: number;
  completionRate: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockedDate?: string;
  color: string;
  progress?: number; // 0-100 for unlockable achievements
  isLocked?: boolean;
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  count?: number;
  percentage?: number;
}

export interface WeeklySummary {
  weekRange: {
    start: string;
    end: string;
  };
  dailyStats: DayStats[];
  totals: {
    tasksCompleted: number;
    totalTasks: number;
    focusMinutes: number;
    completionRate: number;
  };
  insights?: string[];
  topCategories?: TaskCategory[];
}

export interface YearlySummary {
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
  highlights?: {
    mostProductiveMonth: string;
    biggestGrowth: string;
    consistencyRecord: string;
  };
}

export interface SummaryExportOptions {
  type: 'weekly' | 'yearly';
  format: 'pdf' | 'csv' | 'json';
  weekOffset?: number;
  year?: number;
  includeCharts?: boolean;
  includeInsights?: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, unknown>;
}

export interface InsightCard {
  icon: string;
  title: string;
  description: string;
  color: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}