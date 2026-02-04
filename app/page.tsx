'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-primary rounded-xl mb-6 animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-heading-1 text-primary mb-2">Dayzen</h1>
        <div className="w-16 h-1 bg-accent-primary rounded-full mx-auto mb-4"></div>
        <p className="text-body-regular text-secondary">Loading your workspace...</p>
      </div>
    </div>
  );
}