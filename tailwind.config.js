/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          luxury: {
            gold: '#FFD700',
            emerald: '#50C878',
            purple: '#800080',
            background: '#0A0B0E',
            card: '#1A1B1E',
            text: '#E5E7EB',
            muted: '#9CA3AF',
            border: '#2D2F34',
            hover: '#2A2D31',
          },
          gradient: {
            start: '#2C0735',
            middle: '#1A1B1E',
            end: '#0A0B0E',
          },
        },
        animation: {
          'gradient-x': 'gradient-x 15s ease infinite',
          'float': 'float 6s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center',
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center',
            },
          },
          'float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'glow': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.7 },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  };