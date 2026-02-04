import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ children, className, padding = 'lg', hover = false }: CardProps) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };
  
  return (
    <div
      className={cn(
        'bg-secondary rounded-xl shadow-sm transition-smooth',
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}