// types/summaries.ts

// --- Shared sub-types ---

export interface DailyStat {
  day: string;
  date: Date;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
}

export interface MonthStat {
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
  unlockedDate: string;
  color: string;
}

export interface Category {
  name: string;
  count: number;
  percentage: number;
}

// --- Weekly Summary ---

export interface WeeklySummary {
  weekRange: {
    start: string;
    end: string;
  };
  dailyStats: DailyStat[];
  totals: {
    tasksCompleted: number;
    totalTasks: number;
    focusMinutes: number;
    completionRate: number;
  };
  insights: string[];
}

// --- Yearly Summary ---

export interface YearlySummary {
  year: number;
  monthlyStats: MonthStat[];
  achievements: Achievement[];
  categories: Category[];
  totals: {
    tasksCompleted: number;
    focusHours: number;
    avgCompletionRate: number;
  };
  highlights: {
    mostProductiveMonth: string;
    biggestGrowth: string;
    consistencyRecord: string;
  };
}