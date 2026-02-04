'use client';

import Image from 'next/image';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { mockUser } from '@/lib/mock-data';

export function TopNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 bg-secondary border-b border-color px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-heading-1 text-accent-primary font-bold">Dayzen</h1>
        <span className="text-body-sm text-tertiary">/</span>
        <span className="text-body-sm text-secondary">Dashboard</span>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
          <input
            type="text"
            placeholder="Search tasks, notes, or ask AI..."
            className="w-full pl-11 pr-4 py-2.5 bg-tertiary border border-color rounded-lg
                     text-body-regular text-primary placeholder:text-tertiary
                     focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
                     transition-standard"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-tertiary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                   flex items-center justify-center transition-smooth"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-secondary" />
          ) : (
            <Sun className="w-5 h-5 text-secondary" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="w-10 h-10 rounded-full bg-tertiary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                   flex items-center justify-center relative transition-smooth"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-danger rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 hover:opacity-80 transition-standard">
          <div className="relative w-9 h-9">
            <Image
              src={mockUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'}
              alt={mockUser.name}
              width={36}
              height={36}
              className="rounded-full border-2 border-color"
              unoptimized
            />
          </div>
        </button>
      </div>
    </nav>
  );
}