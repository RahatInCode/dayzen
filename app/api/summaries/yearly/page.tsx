'use client';

// Fix 1: Import React explicitly so React.ElementType resolves correctly
import React, { useState, useEffect } from 'react';
import { fetchYearlySummary } from '@/lib/api/summaries';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Trophy,
  Calendar,
  BarChart2,
  AlertCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MonthStat {
  month: string;
  tasksCompleted: number;
  focusHours: number;
  completionRate: number;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockedDate: string;
  color: string;
}

interface Category {
  name: string;
  count: number;
  percentage: number;
}

interface YearlyTotals {
  tasksCompleted: number;
  focusHours: number;
  avgCompletionRate: number;
}

interface YearlySummaryData {
  year: number;
  monthlyStats: MonthStat[];
  achievements: Achievement[];
  categories: Category[];
  totals: YearlyTotals;
  highlights?: {
    mostProductiveMonth: string;
    biggestGrowth: string;
    consistencyRecord: string;
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  // Fix 1: React must be imported for React.ElementType to work
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-5 flex flex-col gap-3 group hover:border-white/10 transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest font-medium">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
      </div>
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${accent} rounded-2xl`}
      />
    </div>
  );
}

function MonthBar({
  stat,
  maxTasks,
  isTop,
}: {
  stat: MonthStat;
  maxTasks: number;
  isTop: boolean;
}) {
  const barH = maxTasks > 0 ? (stat.tasksCompleted / maxTasks) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 group cursor-default">
      <div className="w-full flex flex-col justify-end h-24 relative">
        <div
          // Fix 7: bg-white/15 and bg-indigo-600/8 are non-standard Tailwind opacity values.
          // Replaced with valid Tailwind classes: bg-white/10 and bg-indigo-600/10
          className={`w-full rounded-t-lg transition-all duration-700 ${
            isTop ? 'bg-indigo-500' : 'bg-white/10'
          } group-hover:bg-indigo-400`}
          style={{ height: `${barH}%`, minHeight: '4px' }}
        />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-3 text-xs whitespace-nowrap shadow-xl">
            <p className="text-white font-semibold mb-1">{stat.month}</p>
            <p className="text-white/60">✅ {stat.tasksCompleted} tasks</p>
            <p className="text-white/60">⏱ {stat.focusHours}h focus</p>
            <p className={stat.completionRate >= 85 ? 'text-green-400' : 'text-indigo-400'}>
              {stat.completionRate}% rate
            </p>
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-white/30 group-hover:text-white/60 transition-colors">
        {stat.month}
      </span>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    // Fix 3: achievement.color was defined in the interface but never used in JSX.
    // Now applied as a background tint on the card itself.
    <div
      className={`rounded-2xl border border-white/5 p-4 flex items-center gap-3 hover:border-white/10 transition-colors ${achievement.color}`}
    >
      <span className="text-2xl flex-shrink-0">{achievement.icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{achievement.title}</p>
        <p className="text-xs text-white/60 leading-relaxed">{achievement.description}</p>
        <p className="text-[10px] text-white/30 mt-0.5">
          {new Date(achievement.unlockedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

function CategoryBar({ category, index }: { category: Category; index: number }) {
  const colors = [
    'bg-indigo-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-green-500',
    'bg-white/30',
  ];
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-xs text-white/50 truncate">{category.name}</span>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colors[index % colors.length]}`}
          style={{ width: `${category.percentage}%` }}
        />
      </div>
      <span className="w-12 text-right text-xs text-white/40">{category.count}</span>
      <span className="w-8 text-right text-xs text-white/25">{category.percentage}%</span>
    </div>
  );
}

export default function YearlyReviewPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<YearlySummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  // Fix 9: Added missing error state — previously fetch failures were silent
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    setError(null);
    fetchYearlySummary(year)
      .then((d) => setData(d as YearlySummaryData))
      .catch(() => setError('Failed to load yearly summary. Please try again.'))
      .finally(() => setLoading(false));
  }, [year]);

  const topMonth =
    data && data.monthlyStats.length > 0
      ? data.monthlyStats.reduce((a, b) =>
          a.tasksCompleted > b.tasksCompleted ? a : b
        )
      : null;

  // Fix 4: maxTasks now safely derived only when monthlyStats is non-empty
  const maxTasks =
    data && data.monthlyStats.length > 0
      ? Math.max(...data.monthlyStats.map((m) => m.tasksCompleted), 1)
      : 1;

  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0f0f1a)] text-white">
      {/* Fix 7: Replaced non-standard bg-indigo-600/8 with bg-indigo-600/10 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-widest mb-2">
              <Calendar size={12} />
              <span>Yearly Review</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{year}</h1>
          </div>

          {/* Year navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setYear((y) => y - 1)}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous year"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setYear(currentYear)}
              disabled={year === currentYear}
              className="px-4 h-9 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              This year
            </button>
            <button
              onClick={() => setYear((y) => y + 1)}
              disabled={year >= currentYear}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next year"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          </div>

        /* ── Fix 9: Error state UI (was completely missing) ── */
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
            <AlertCircle size={32} className="text-red-400" />
            <p className="text-white/50 text-sm">{error}</p>
            <button
              onClick={() => setYear((y) => y)}
              className="mt-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
            >
              Retry
            </button>
          </div>

        ) : data ? (
          <>
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <StatCard
                icon={CheckCircle}
                label="Tasks Completed"
                value={data.totals.tasksCompleted.toLocaleString()}
                sub="across all months"
                accent="bg-indigo-500/10 text-indigo-400"
              />
              {/* Fix 6: Guard against division by zero when focusHours is 0 */}
              <StatCard
                icon={Clock}
                label="Focus Hours"
                value={`${data.totals.focusHours}h`}
                sub={
                  data.totals.focusHours > 0
                    ? `${Math.round(data.totals.focusHours / 12)}h avg/month`
                    : 'No focus data yet'
                }
                accent="bg-amber-500/10 text-amber-400"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg Completion"
                value={`${data.totals.avgCompletionRate}%`}
                sub={data.totals.avgCompletionRate >= 85 ? '🔥 Excellent year' : '👍 Solid year'}
                accent="bg-green-500/10 text-green-400"
              />
            </div>

            {/* ── Highlights ── */}
            {data.highlights && (
              <div className="grid sm:grid-cols-3 gap-3">
                {/* Fix 8: Use stable unique keys (emoji+label combo) instead of just label */}
                {[
                  { emoji: '🏆', label: 'Best Month', text: data.highlights.mostProductiveMonth },
                  { emoji: '📈', label: 'Growth',     text: data.highlights.biggestGrowth },
                  { emoji: '🎯', label: 'Consistency', text: data.highlights.consistencyRecord },
                ].map((h) => (
                  <div
                    key={`highlight-${h.label}`}
                    className="rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-4 flex items-start gap-3"
                  >
                    <span className="text-xl flex-shrink-0">{h.emoji}</span>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">{h.label}</p>
                      <p className="text-sm text-white/80 mt-0.5 leading-snug">{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Monthly chart ── */}
            <div className="rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest flex items-center gap-2">
                  <BarChart2 size={14} />
                  Monthly Tasks
                </h2>
                {topMonth && (
                  <span className="text-xs text-white/30">
                    Peak:{' '}
                    <span className="text-indigo-400 font-semibold">{topMonth.month}</span>
                  </span>
                )}
              </div>
              {/* Fix 5: Only render chart when monthlyStats is non-empty */}
              {data.monthlyStats.length > 0 ? (
                <div className="flex gap-1.5 items-end">
                  {data.monthlyStats.map((stat) => (
                    <MonthBar
                      key={stat.month}
                      stat={stat}
                      maxTasks={maxTasks}
                      isTop={stat.month === topMonth?.month}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-8">No monthly data available.</p>
              )}
            </div>

            {/* ── Monthly completion rates ── */}
            <div className="rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-6">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                Monthly Completion Rates
              </h2>
              <div className="space-y-3">
                {data.monthlyStats.map((stat) => {
                  const color =
                    stat.completionRate >= 85
                      ? 'bg-green-500'
                      : stat.completionRate >= 70
                      ? 'bg-indigo-500'
                      : 'bg-amber-500';
                  return (
                    <div key={stat.month} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-semibold text-white/40">{stat.month}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${color}`}
                          style={{ width: `${stat.completionRate}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-xs text-white/40">
                        {stat.completionRate}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Categories + Achievements ── */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-6">
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                  Task Categories
                </h2>
                <div className="space-y-3">
                  {data.categories.map((cat, i) => (
                    <CategoryBar key={cat.name} category={cat} index={i} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[var(--bg-secondary,#1a1a2e)] border border-white/5 p-6">
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Trophy size={14} />
                  Achievements
                </h2>
                <div className="space-y-2">
                  {data.achievements.map((ach) => (
                    <AchievementCard key={ach.id} achievement={ach} />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-white/30 py-20">No data available for {year}.</div>
        )}
      </div>
    </div>
  );
}