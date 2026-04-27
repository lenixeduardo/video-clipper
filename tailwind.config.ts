import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '3680px' },
    },
    extend: {
      colors: {
        surface: {
          DEFAULT: '#121221',
          dim: '#121221',
          bright: '#383849',
          lowest: '#0d0d1c',
          low: '#1a1a2a',
          container: '#1e1e2e',
          high: '#292839',
          highest: '#333344',
          variant: '#333344',
          tint: '#2fd9f4',
        },
        'on-surface': '#e3e0f7',
        'on-surface-variant': '#bbc9cd',
        outline: '#859397',
        'outline-variant': '#3c494c',
        primary: {
          DEFAULT: '#8aebff',
          container: '#22d3ee',
          fixed: '#a2eeff',
          'fixed-dim': '#2fd9f4',
        },
        'on-primary': '#00363e',
        'on-primary-container': '#005763',
        secondary: {
          DEFAULT: '#c7c5d3',
          container: '#464652',
        },
        'on-secondary': '#302f3b',
        'on-secondary-container': '#b6b3c2',
        tertiary: {
          DEFAULT: '#ffd6a3',
          container: '#ffb13b',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        background: '#121221',
        'on-background': '#e3e0f7',
        cyan: {
          400: '#22d3ee',
          glow: '#2fd9f4',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        sidebar: '16rem',
        'sidebar-collapsed': '3rem',
      },
      backdropBlur: {
        lens: '10px',
        focus: '20px',
      },
      transitionDuration: {
        brand: '600ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-up-delay': 'fade-up 0.6s ease-out 0.2s both',
        'fade-up-delay-2': 'fade-up 0.6s ease-out 0.4s both',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(10,10,20,0.5)',
        'card-hover': '0 8px 48px 0 rgba(34,211,238,0.08)',
        'glow-cyan': '0 0 20px rgba(47,217,244,0.3)',
        'glow-cyan-lg': '0 0 40px rgba(47,217,244,0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
