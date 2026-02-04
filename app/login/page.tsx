'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - replace with real auth later
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        toast.success('Welcome to Dayzen!');
        router.push('/dashboard');
      } else {
        toast.error('Please enter your credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-primary rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-display-lg text-primary mb-2">Dayzen</h1>
          <p className="text-body-regular text-secondary">
            AI-Powered Productivity Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-secondary rounded-xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-body-sm text-secondary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-tertiary border border-color rounded-md 
                         text-body-regular text-primary placeholder:text-tertiary
                         focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2
                         transition-standard"
                placeholder="alex@dayzen.app"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-body-sm text-secondary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-tertiary border border-color rounded-md 
                         text-body-regular text-primary placeholder:text-tertiary
                         focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2
                         transition-standard"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-primary hover:bg-accent-hover 
                       text-white font-medium py-3 rounded-md
                       flex items-center justify-center gap-2
                       transition-smooth disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body-sm text-tertiary">
              Demo: Enter any email + password to continue
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-body-sm text-tertiary">
            Don&apos;t have an account?{' '}
            <button className="text-accent-primary hover:text-accent-hover font-medium transition-standard">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}