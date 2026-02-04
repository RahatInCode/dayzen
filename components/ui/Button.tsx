import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent-primary hover:bg-accent-hover text-white focus:ring-accent-primary',
    secondary: 'bg-tertiary hover:bg-light-border dark:hover:bg-dark-border text-primary focus:ring-accent-primary',
    ghost: 'hover:bg-tertiary text-secondary hover:text-primary',
    danger: 'bg-status-danger hover:bg-red-600 text-white focus:ring-status-danger',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-body-sm',
    md: 'px-5 py-2.5 text-body-regular',
    lg: 'px-6 py-3 text-body-lg',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}