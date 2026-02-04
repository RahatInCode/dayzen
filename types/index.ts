export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  estimatedTime?: string;
  category?: string;
  scheduledTime?: string;
  dueDate?: string;
}

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  type: 'reorder' | 'break' | 'focus' | 'delegate';
  actionLabel: string;
}

export interface DailySummary {
  tasksCompleted: number;
  totalTasks: number;
  focusTime: string;
  priorityScore: number;
}

export interface StreakData {
  currentStreak: number;
  weekData: boolean[];
}

export interface AnalyticsData {
  labels: string[];
  values: number[];
  estimated: string;
  actual: string;
  difference: string;
}

export type TimerMode = 'pomodoro' | 'short-break' | 'long-break';

export interface TimerState {
  mode: TimerMode;
  timeRemaining: number;
  isRunning: boolean;
  currentTask?: string;
}