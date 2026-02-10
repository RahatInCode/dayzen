'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, CheckCircle, Zap, Calendar, BarChart2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyStat {
  day: string;
  date?: Date;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
}

interface WeeklyTotals {
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
  completionRate: number;
}

interface WeeklySummaryData {
  weekRange: { start: string; end: string };
  dailyStats: DailyStat[];
  totals: WeeklyTotals;
  insights: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchWeeklySummary(weekOffset: number): Promise<WeeklySummaryData> {
  const response = await fetch(`/api/weekly?offset=${weekOffset}`);
  if (!response.ok) throw new Error('Failed to fetch weekly summary');
  return response.json();
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
}

function formatHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-(--bg-secondary,#1a1a2e) border border-white/5 p-5 flex flex-col gap-3 group hover:border-white/10 transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest font-medium">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
      </div>
      {/* subtle glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${accent} rounded-2xl`} />
    </div>
  );
}

function DayBar({
  stat,
  maxTasks,
  maxFocus,
}: {
  stat: DailyStat;
  maxTasks: number;
  maxFocus: number;
}) {
  const completionPct = stat.totalTasks > 0 ? (stat.tasksCompleted / stat.totalTasks) * 100 : 0;
  const taskBarH = maxTasks > 0 ? (stat.tasksCompleted / maxTasks) * 100 : 0;
  const focusBarH = maxFocus > 0 ? (stat.focusMinutes / maxFocus) * 100 : 0;

  const barColor =
    completionPct >= 85
      ? 'bg-[var(--status-success,#22c55e)]'
      : completionPct >= 70
      ? 'bg-[var(--accent-primary,#6366f1)]'
      : 'bg-[var(--status-warning,#f59e0b)]';

  return (
    <div className="flex flex-col items-center gap-2 flex-1 group">
      {/* Bars */}
      <div className="w-full flex gap-1 items-end h-28">
        {/* Tasks bar */}
        <div className="flex-1 flex flex-col justify-end h-full">
          <div
            className={`w-full rounded-t-lg transition-all duration-700 ${barColor} opacity-90`}
            style={{ height: `${taskBarH}%`, minHeight: '4px' }}
            title={`${stat.tasksCompleted}/${stat.totalTasks} tasks`}
          />
        </div>
        {/* Focus bar */}
        <div className="flex-1 flex flex-col justify-end h-full">
          <div
            className="w-full rounded-t-lg bg-white/10 transition-all duration-700"
            style={{ height: `${focusBarH}%`, minHeight: '4px' }}
            title={`${formatHours(stat.focusMinutes)} focus`}
          />
        </div>
      </div>

      {/* Tooltip on hover */}
      <div className="relative">
        <p className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">{stat.day}</p>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-3 text-xs whitespace-nowrap shadow-xl">
            <p className="text-white font-semibold mb-1">{stat.day}</p>
            <p className="text-white/60">✅ {stat.tasksCompleted}/{stat.totalTasks} tasks</p>
            <p className="text-white/60">⏱ {formatHours(stat.focusMinutes)}</p>
            <p className={completionPct >= 85 ? 'text-green-400' : completionPct >= 70 ? 'text-indigo-400' : 'text-amber-400'}>
              {Math.round(completionPct)}% done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ text, index }: { text: string; index: number }) {
  const icons = ['🎯', '⚡', '📈'];
  const borders = ['border-indigo-500/30', 'border-amber-500/30', 'border-green-500/30'];
  const glows = ['bg-indigo-500/5', 'bg-amber-500/5', 'bg-green-500/5'];

  return (
    <div className={`rounded-2xl border ${borders[index % 3]} ${glows[index % 3]} p-4 flex gap-3 items-start`}>
      <span className="text-xl shrink-0">{icons[index % 3]}</span>
      <p className="text-sm text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function WeeklyReviewPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<WeeklySummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklySummary(weekOffset)
      .then(setData)
      .finally(() => setLoading(false));
  }, [weekOffset]);

  const maxTasks = data
    ? Math.max(...data.dailyStats.map((d) => d.tasksCompleted), 1)
    : 1;
  const maxFocus = data
    ? Math.max(...data.dailyStats.map((d) => d.focusMinutes), 1)
    : 1;

  return (
    <div className="min-h-screen bg-(--bg-primary,#0f0f1a) text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-widest mb-2">
              <Calendar size={12} />
              <span>Weekly Review</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {data ? formatDateRange(data.weekRange.start, data.weekRange.end) : 'Loading…'}
            </h1>
          </div>

          {/* Week navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWeekOffset((o) => o - 1)}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              disabled={weekOffset === 0}
              className="px-4 h-9 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              This week
            </button>
            <button
              onClick={() => setWeekOffset((o) => o + 1)}
              disabled={weekOffset >= 0}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next week"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          </div>
        ) : data ? (
          <>
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard
                icon={CheckCircle}
                label="Tasks Done"
                value={`${data.totals.tasksCompleted}`}
                sub={`of ${data.totals.totalTasks} total`}
                accent="bg-indigo-500/10 text-indigo-400"
              />
              <StatCard
                icon={TrendingUp}
                label="Completion"
                value={`${data.totals.completionRate}%`}
                sub={data.totals.completionRate >= 85 ? '🔥 Excellent' : data.totals.completionRate >= 70 ? '👍 Good' : '💪 Keep going'}
                accent="bg-green-500/10 text-green-400"
              />
              <StatCard
                icon={Clock}
                label="Focus Time"
                value={formatHours(data.totals.focusMinutes)}
                sub={`${Math.round(data.totals.focusMinutes / 7)} min/day avg`}
                accent="bg-amber-500/10 text-amber-400"
              />
              <StatCard
                icon={Zap}
                label="Avg / Day"
                value={`${Math.round(data.totals.tasksCompleted / 7)}`}
                sub="tasks per day"
                accent="bg-violet-500/10 text-violet-400"
              />
            </div>

            {/* ── Daily chart ── */}
            <div className="rounded-2xl bg-(--bg-secondary,#1a1a2e) border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest flex items-center gap-2">
                  <BarChart2 size={14} />
                  Daily Breakdown
                </h2>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                    Tasks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-white/20 inline-block" />
                    Focus
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                {data.dailyStats.map((stat) => (
                  <DayBar key={stat.day} stat={stat} maxTasks={maxTasks} maxFocus={maxFocus} />
                ))}
              </div>
            </div>

            {/* ── Completion rate row ── */}
            <div className="rounded-2xl `bg-(--bg-secondary,#1a1a2e)` border border-white/5 p-6">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                Daily Completion Rate
              </h2>
              <div className="space-y-3">
                {data.dailyStats.map((stat) => {
                  const pct = stat.totalTasks > 0 ? Math.round((stat.tasksCompleted / stat.totalTasks) * 100) : 0;
                  const color =
                    pct >= 85 ? 'bg-green-500' : pct >= 70 ? 'bg-indigo-500' : 'bg-amber-500';
                  return (
                    <div key={stat.day} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-semibold text-white/40">{stat.day}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-xs text-white/40">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Insights ── */}
            {data.insights && data.insights.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
                  Weekly Insights
                </h2>
                <div className="grid sm:grid-cols-1 gap-3">
                  {data.insights.map((insight, i) => (
                    <InsightCard key={i} text={insight} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white/30 py-20">No data available for this week.</div>
        )}
      </div>
    </div>
  );
}