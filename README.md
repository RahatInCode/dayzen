# Dayzen Dashboard

> A serene, AI-powered productivity workspace built with Next.js 14, TypeScript, and Tailwind CSS.

![Dayzen Dashboard](https://via.placeholder.com/1200x600/6366F1/FFFFFF?text=Dayzen+Dashboard)

## ✨ Features

- 🎨 **Beautiful Design System** - Premium UI inspired by Notion, Linear, and Apple's design philosophy
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent preferences
- 🤖 **AI Assistant Sidebar** - Smart task suggestions and daily insights (mock UI ready for integration)
- ⏱️ **Pomodoro Timer** - Built-in focus sessions with customizable durations
- 📊 **Analytics Dashboard** - Track productivity trends and completion rates
- 🔥 **Streak Tracking** - Maintain motivation with daily productivity streaks
- 📅 **Calendar Integration** - Mini calendar with task scheduling (ready for backend)
- 🎯 **Priority Management** - Visual task prioritization with drag-and-drop support
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ♿ **Accessibility First** - WCAG AA compliant with keyboard navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dayzen-dashboard.git
cd dayzen-dashboard

Install dependencies
Bash

npm install
# or
yarn install
# or
pnpm install
Run the development server
Bash

npm run dev
# or
yarn dev
# or
pnpm dev
Open your browser
Navigate to http://localhost:3000

Demo Login
Use any email and password combination to access the mock dashboard.

🏗️ Project Structure
text

dayzen-dashboard/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                  # Authentication routes
│   │   └── login/
│   ├── (dashboard)/             # Dashboard routes (protected)
│   │   ├── layout.tsx          # Dashboard layout wrapper
│   │   └── page.tsx            # Main dashboard page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── CalendarMini.tsx
│   │   └── AISuggestionBlock.tsx
│   ├── layout/                 # Layout components
│   │   ├── TopNav.tsx
│   │   ├── LeftSidebar.tsx
│   │   └── RightPanel.tsx
│   ├── widgets/                # Reusable widgets
│   │   ├── FocusTimer.tsx
│   │   ├── StreakTracker.tsx
│   │   └── AnalyticsPanel.tsx
│   └── ui/                     # Base UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── hooks/                       # Custom React hooks
│   └── useTheme.tsx
├── lib/                         # Utility functions
│   ├── utils.ts
│   └── mock-data.ts            # Mock data for UI
├── types/                       # TypeScript type definitions
│   └── index.ts
└── public/                      # Static assets
🎨 Design System
Color Palette
The project uses a carefully crafted color system supporting both light and dark modes:

Accent Primary: #6366F1 (Indigo)
Success: #10B981 (Emerald)
Warning: #F59E0B (Amber)
Danger: #EF4444 (Red)
Typography
Primary Font: Inter (UI elements)
Monospace Font: JetBrains Mono (timer, code)
Key Design Principles
Breathing Room - Generous spacing and padding
Subtle Depth - Layered shadows and elevation
Information Hierarchy - Clear visual organization
Premium Feel - Polished micro-interactions
🔌 Integration Guide
This is a mock UI ready for backend integration. Here's where to add your functionality:

Authentication
File: app/(auth)/login/page.tsx

TypeScript

// Replace mock authentication (line 15-25)
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Add your authentication logic here
  // Example: await signIn(email, password)
};
Task Management
File: components/dashboard/TaskList.tsx

TypeScript

// Add task creation (line 23)
const handleAddTask = async () => {
  // TODO: Call your API to create task
  // Example: await createTask({ title, priority, etc })
};

// Update task status (line 15)
const handleToggleTask = async (id: string) => {
  // TODO: Call your API to update task
  // Example: await updateTask(id, { completed: !task.completed })
};
Focus Timer
File: components/widgets/FocusTimer.tsx

TypeScript

// Save completed session (line 29)
useEffect(() => {
  if (timeRemaining === 0) {
    // TODO: Log focus session to database
    // Example: await saveFocusSession({ duration, taskId })
  }
}, [timeRemaining]);
AI Suggestions
File: components/layout/LeftSidebar.tsx

Replace mockAISuggestions with API calls:

TypeScript

// TODO: Fetch AI suggestions from your backend
// Example: const suggestions = await fetchAISuggestions()
Analytics
File: components/widgets/AnalyticsPanel.tsx

Replace mockAnalyticsData with real data:

TypeScript

// TODO: Fetch analytics from your API
// Example: const analytics = await fetchWeeklyAnalytics()
🛠️ Technologies Used
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
Icons: Lucide React
Animations: GSAP (ready for custom animations)
Notifications: React Hot Toast
📱 Responsive Breakpoints
Desktop: 1024px+ (3-column layout)
Tablet: 768px-1023px (2-column layout, collapsible sidebar)
Mobile: <768px (single column, stacked panels)
♿ Accessibility
✅ WCAG AA color contrast ratios
✅ Keyboard navigation support
✅ Screen reader friendly (ARIA labels)
✅ Focus indicators on all interactive elements
✅ Respects prefers-reduced-motion
🚧 Roadmap
 Backend API integration
 Real-time task synchronization
 User authentication (NextAuth.js)
 Database integration (Prisma + PostgreSQL)
 AI-powered task suggestions (OpenAI API)
 Mobile app (React Native)
 Collaboration features
 Third-party integrations (Google Calendar, Notion, etc.)
📝 License
MIT License - feel free to use this project for personal or commercial purposes.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

💬 Support
For questions or support, please open an issue on GitHub.

Built with ❤️ using Next.js and Tailwind CSS