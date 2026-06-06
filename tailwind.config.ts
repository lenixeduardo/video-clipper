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
        // Solarpunk palette
        ink: '#1e2d1a',
        bark: '#5c4033',
        forest: {
          DEFAULT: '#1a3d15',
          deep: '#0f2a0b',
          mid: '#2d5a27',
          light: '#3d7a35',
        },
        sage: {
          DEFAULT: '#5a8a4a',
          light: '#8ab58a',
          pale: '#c2d9b8',
        },
        sun: {
          DEFAULT: '#c9862a',
          light: '#e8a945',
          pale: '#f5d080',
          dark: '#9a6118',
        },
        clay: {
          DEFAULT: '#b85c25',
          light: '#d4824e',
          pale: '#f0cdb8',
        },
        parchment: {
          DEFAULT: '#f5ede0',
          warm: '#faf7ef',
          cream: '#ede0c4',
          wheat: '#d8c8a0',
          deep: '#c8b880',
        },
        background: '#f5ede0',
        error: {
          DEFAULT: '#b85c25',
          container: '#fbe8d8',
        },
      },
      fontFamily: {
        serif: ['var(--font-josefin-slab)', '"Josefin Slab"', 'Georgia', 'serif'],
        sans: ['var(--font-syne)', '"Syne"', 'system-ui', 'sans-serif'],
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
        glass: '0 4px 32px 0 rgba(30, 45, 26, 0.08)',
        'card-hover': '0 8px 48px 0 rgba(90, 138, 74, 0.14)',
        'glow-sun': '0 0 20px rgba(201, 134, 42, 0.30)',
        'glow-sun-lg': '0 0 40px rgba(201, 134, 42, 0.18)',
        bark: '0 2px 12px rgba(30, 45, 26, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
