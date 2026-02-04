'use client';

import { useState } from 'react';
import { TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { mockAnalyticsData } from '@/lib/mock-data';

export function AnalyticsPanel() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { labels, values, estimated, actual, difference } = mockAnalyticsData;
  
  const maxValue = Math.max(...values);

  return (
    <Card padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-heading-2 text-primary">This Week</h3>
        <select className="text-body-sm text-secondary bg-tertiary border border-color rounded-md px-3 py-1.5
                         focus:outline-none focus:ring-2 focus:ring-accent-primary">
          <option>7 days</option>
          <option>30 days</option>
          <option>3 months</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-36 gap-2">
          {values.map((value, index) => {
            const height = (value / maxValue) * 100;
            
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2 group relative"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === index && (
                  <div className="absolute -top-8 bg-dark-bg-secondary text-dark-text-primary 
                                px-2 py-1 rounded text-caption whitespace-nowrap z-10 shadow-lg">
                    {value}h
                  </div>
                )}
                
                {/* Bar */}
                <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-accent-primary/20 hover:bg-accent-primary/40 rounded-t transition-all duration-300 cursor-pointer"
                    style={{ height: `${height}%`, minHeight: value > 0 ? '4px' : '0' }}
                  />
                </div>
                
                {/* Label */}
                <span className="text-caption text-tertiary">{labels[index]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-color">
        <div>
          <p className="text-caption text-tertiary mb-1">Estimated</p>
          <p className="text-body-lg text-primary font-semibold">{estimated}</p>
        </div>
        <div>
          <p className="text-caption text-tertiary mb-1">Actual</p>
          <p className="text-body-lg text-accent-primary font-semibold">{actual}</p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-status-success" />
            <span className="text-body-sm text-status-success font-medium">{difference}</span>
            <span className="text-body-sm text-tertiary">from estimate</span>
          </div>
        </div>
      </div>
    </Card>
  );
}