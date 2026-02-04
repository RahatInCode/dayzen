import { FocusTimer } from '@/components/widgets/FocusTimer';
import { StreakTracker } from '@/components/widgets/StreakTracker';
import { AnalyticsPanel } from '@/components/widgets/AnalyticsPanel';

export function RightPanel() {
  return (
    <aside className="w-80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-6 space-y-5">
        <FocusTimer />
        <StreakTracker />
        <AnalyticsPanel />
      </div>
    </aside>
  );
}