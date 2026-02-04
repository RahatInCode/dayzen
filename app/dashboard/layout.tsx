'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TopNav } from '@/components/layout/TopNav';

import { RightPanel } from '@/components/layout/RightPanel';
import { LeftSidebar } from '@/components/layout/LeftSideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication - replace with real auth
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-primary">
      <TopNav />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 min-w-0">{children}</main>
        <RightPanel />
      </div>
    </div>
  );
}