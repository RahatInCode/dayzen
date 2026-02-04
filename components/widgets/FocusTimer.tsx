'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Square } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatTime } from '@/lib/utils';
import toast from 'react-hot-toast';

const TIMER_MODES = {
  pomodoro: { label: 'Pomodoro', duration: 25 * 60 },
  'short-break': { label: 'Short Break', duration: 5 * 60 },
  'long-break': { label: 'Long Break', duration: 15 * 60 },
};

export function FocusTimer() {
  const [mode, setMode] = useState<keyof typeof TIMER_MODES>('pomodoro');
  const [timeRemaining, setTimeRemaining] = useState(TIMER_MODES.pomodoro.duration);
  const [isRunning, setIsRunning] = useState(false);
  
  const progress = ((TIMER_MODES[mode].duration - timeRemaining) / TIMER_MODES[mode].duration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // stop interval and mark finished from inside the async callback
            if (interval) clearInterval(interval);
            setIsRunning(false);
            toast.success('Focus session complete! 🎉');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.success('Focus session started');
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeRemaining(TIMER_MODES[mode].duration);
    toast('Timer reset');
  };

  const handleSkip = () => {
    setIsRunning(false);
    setTimeRemaining(TIMER_MODES[mode].duration);
    toast('Skipped to next session');
  };

  const handleModeChange = (newMode: keyof typeof TIMER_MODES) => {
    setMode(newMode);
    setTimeRemaining(TIMER_MODES[newMode].duration);
    setIsRunning(false);
  };

  return (
    <Card padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-heading-2 text-primary">Focus Session</h3>
        <select
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as keyof typeof TIMER_MODES)}
          className="text-body-sm text-secondary bg-tertiary border border-color rounded-md px-3 py-1.5
                   focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          {Object.entries(TIMER_MODES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-44 h-44 mb-6">
          {/* Background Circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="80"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-light-border dark:text-dark-border"
            />
            {/* Progress Circle */}
            <circle
              cx="88"
              cy="88"
              r="80"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              className="text-accent-primary transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-mono font-bold text-primary">
              {formatTime(timeRemaining)}
            </span>
            <span className="text-caption text-secondary mt-1">Remaining</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStop}
            className="w-9 h-9 rounded-full bg-tertiary hover:bg-light-border dark:hover:bg-dark-border
                     flex items-center justify-center transition-smooth"
          >
            <Square className="w-4 h-4 text-secondary" />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-accent-primary hover:bg-accent-hover
                     flex items-center justify-center transition-smooth shadow-md hover:shadow-lg"
          >
            {isRunning ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={handleSkip}
            className="w-9 h-9 rounded-full bg-tertiary hover:bg-light-border dark:hover:bg-dark-border
                     flex items-center justify-center transition-smooth"
          >
            <SkipForward className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>

      {/* Current Task */}
      <div className="text-center">
        <p className="text-body-sm text-secondary">Working on:</p>
        <p className="text-body-regular text-primary font-medium truncate">
          Design Dashboard UI mockups
        </p>
      </div>
    </Card>
  );
}