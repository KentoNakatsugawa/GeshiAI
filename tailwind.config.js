/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#0066FF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'border-accent': '#E0E0E0',
        'bg-light': '#F5F5F5',
        'hot-s': '#FF4444',
        'hot-a': '#FF8800',
        'hot-b': '#FFCC00',
        'hot-c': '#44BB44',
        'hot-d': '#4488FF',
        'hot-e': '#888888',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'pulse-highlight': 'pulse-highlight 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-highlight': {
          '0%, 100%': {
            backgroundColor: 'rgba(0, 102, 255, 0.2)',
            boxShadow: '0 0 0 0 rgba(0, 102, 255, 0.4)'
          },
          '50%': {
            backgroundColor: 'rgba(0, 102, 255, 0.4)',
            boxShadow: '0 0 20px 5px rgba(0, 102, 255, 0.3)'
          },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
