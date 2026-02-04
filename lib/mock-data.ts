import { Task, AISuggestion, DailySummary, StreakData, AnalyticsData, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@dayzen.app',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Dashboard UI mockups',
    description: 'Create high-fidelity designs for the main dashboard',
    completed: false,
    priority: 'high',
    estimatedTime: '2h',
    category: 'Design',
    scheduledTime: '2:30 PM',
  },
  {
    id: '2',
    title: 'Review pull requests',
    completed: true,
    priority: 'medium',
    estimatedTime: '45m',
    category: 'Development',
    scheduledTime: '10:00 AM',
  },
  {
    id: '3',
    title: 'Team standup meeting',
    completed: true,
    priority: 'low',
    estimatedTime: '30m',
    category: 'Meetings',
    scheduledTime: '9:00 AM',
  },
  {
    id: '4',
    title: 'Update project documentation',
    completed: false,
    priority: 'medium',
    estimatedTime: '1h',
    category: 'Documentation',
    scheduledTime: '4:00 PM',
  },
  {
    id: '5',
    title: 'Client presentation prep',
    completed: false,
    priority: 'high',
    estimatedTime: '3h',
    category: 'Business',
    scheduledTime: '5:30 PM',
  },
];

export const mockAISuggestions: AISuggestion[] = [
  {
    id: '1',
    title: 'Optimize your schedule',
    description: 'Move "Client presentation prep" to tomorrow morning when you\'re most productive.',
    type: 'reorder',
    actionLabel: 'Reschedule',
  },
  {
    id: '2',
    title: 'Take a break',
    description: 'You\'ve been focused for 2 hours. A 10-minute break will boost your productivity.',
    type: 'break',
    actionLabel: 'Start Break',
  },
  {
    id: '3',
    title: 'Focus mode recommended',
    description: 'Based on your calendar, the next 90 minutes are perfect for deep work.',
    type: 'focus',
    actionLabel: 'Start Focus',
  },
];

export const mockDailySummary: DailySummary = {
  tasksCompleted: 12,
  totalTasks: 20,
  focusTime: '3h 42m',
  priorityScore: 85,
};

export const mockStreakData: StreakData = {
  currentStreak: 23,
  weekData: [true, true, true, true, true, true, false], // M-Sun
};

export const mockAnalyticsData: AnalyticsData = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  values: [6, 7.5, 5, 8, 6.5, 4, 0],
  estimated: '28h 30m',
  actual: '24h 15m',
  difference: '↓ 4h 15m',
};