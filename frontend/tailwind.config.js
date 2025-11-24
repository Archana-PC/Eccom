/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Deep & Sophisticated
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Medium gray-blue
          600: '#475569', // Main brand color
          700: '#334155', // Dark gray-blue
          800: '#1e293b', // Deep navy
          900: '#0f172a', // Almost black blue
        },
        
        // Secondary Colors - Warm & Earthy (like their bear logo)
        secondary: {
          50: '#fdf8f3',
          100: '#f7e9d9',
          200: '#eed3b4',
          300: '#e2b585',
          400: '#d48e52',
          500: '#c97338', // Warm brown
          600: '#bb5d2e',
          700: '#9c4828',
          800: '#7e3a26',
          900: '#663122',
        },
        
        // Neutral Colors - Clean & Professional
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // Accent Colors - Premium Highlights
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Amber gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'], // Premium, elegant headings
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      boxShadow: {
        'elegant': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}