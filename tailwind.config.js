/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          colors: {
              // Primary brand colors - Deep Ocean Theme
              primary: {
                  50: '#f0f9ff',
                  100: '#e0f2fe',
                  200: '#bae6fd',
                  300: '#7dd3fc',
                  400: '#38bdf8',
                  500: '#0ea5e9',
                  600: '#0284c7',
                  700: '#0369a1',
                  800: '#075985',
                  900: '#0c4a6e',
                  950: '#082f49',
              },
              // Secondary accent colors - Sunset Orange
              secondary: {
                  50: '#fff7ed',
                  100: '#ffedd5',
                  200: '#fed7aa',
                  300: '#fdba74',
                  400: '#fb923c',
                  500: '#f97316',
                  600: '#ea580c',
                  700: '#c2410c',
                  800: '#9a3412',
                  900: '#7c2d12',
                  950: '#431407',
              },
              // Success colors - Emerald Green
              success: {
                  50: '#ecfdf5',
                  100: '#d1fae5',
                  200: '#a7f3d0',
                  300: '#6ee7b7',
                  400: '#34d399',
                  500: '#10b981',
                  600: '#059669',
                  700: '#047857',
                  800: '#065f46',
                  900: '#064e3b',
                  950: '#022c22',
              },
              // Error colors - Rose Red
              error: {
                  50: '#fff1f2',
                  100: '#ffe4e6',
                  200: '#fecdd3',
                  300: '#fda4af',
                  400: '#fb7185',
                  500: '#f43f5e',
                  600: '#e11d48',
                  700: '#be123c',
                  800: '#9f1239',
                  900: '#881337',
                  950: '#4c0519',
              },
              // Warning colors - Amber Yellow
              warning: {
                  50: '#fffbeb',
                  100: '#fef3c7',
                  200: '#fde68a',
                  300: '#fcd34d',
                  400: '#fbbf24',
                  500: '#f59e0b',
                  600: '#d97706',
                  700: '#b45309',
                  800: '#92400e',
                  900: '#78350f',
                  950: '#451a03',
              },
              // Neutral grays with blue tint
              neutral: {
                  50: '#f8fafc',
                  100: '#f1f5f9',
                  200: '#e2e8f0',
                  300: '#cbd5e1',
                  400: '#94a3b8',
                  500: '#64748b',
                  600: '#475569',
                  700: '#334155',
                  800: '#1e293b',
                  900: '#0f172a',
                  950: '#020617',
              }
          },
          fontFamily: {
              sans: ['Inter', 'system-ui', 'sans-serif'],
              mono: ['JetBrains Mono', 'monospace'],
          },
          borderRadius: {
              'xl': '1rem',
              '2xl': '1.5rem',
              '3xl': '2rem',
          },
          boxShadow: {
              'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
              'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
          },
          animation: {
              'fade-in': 'fadeIn 0.5s ease-in-out',
              'slide-up': 'slideUp 0.3s ease-out',
              'scale-in': 'scaleIn 0.2s ease-out',
              'spin-slow': 'spin 3s linear infinite',
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
              },
              slideUp: {
                  '0%': { transform: 'translateY(10px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              scaleIn: {
                  '0%': { transform: 'scale(0.95)', opacity: '0' },
                  '100%': { transform: 'scale(1)', opacity: '1' },
              },
          }
      },
  },
  plugins: [],
}
