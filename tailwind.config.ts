import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        light: {
          'bg-primary': '#FAFAF9',
          'bg-secondary': '#FFFFFF',
          'bg-tertiary': '#F5F5F4',
          'text-primary': '#1C1917',
          'text-secondary': '#57534E',
          'text-tertiary': '#A8A29E',
          'border': '#E7E5E4',
        },
        dark: {
          'bg-primary': '#0C0A09',
          'bg-secondary': '#1C1917',
          'bg-tertiary': '#292524',
          'text-primary': '#FAFAF9',
          'text-secondary': '#A8A29E',
          'text-tertiary': '#78716C',
          'border': '#292524',
        },
        accent: {
          primary: '#6366F1',
          hover: '#4F46E5',
          light: '#EEF2FF',
          'dark-primary': '#818CF8',
          'dark-hover': '#A5B4FC',
          'dark-light': '#312E81',
        },
        status: {
          success: '#10B981',
          'success-dark': '#34D399',
          warning: '#F59E0B',
          'warning-dark': '#FBBF24',
          danger: '#EF4444',
          'danger-dark': '#F87171',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      fontSize: {
        'display-lg': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-1': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-2': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-regular': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
        'tiny': ['0.6875rem', { lineHeight: '1.2', fontWeight: '500' }],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.07)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      transitionDuration: {
        'standard': '200ms',
        'smooth': '300ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
export default config