/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0F2B3C',
        'strait-teal': '#1A6B6A',
        'calm-sky': '#7EC8C8',
        'warm-sand': '#F5F0E8',
        'soft-white': '#FAFAF8',
        ink: '#1C1C1E',
        mist: '#B8C5CC',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        // Ambient hero background — slow, calm pulse between navy and deep teal
        heroPulse: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Signature waterline divider — teal drifting into sky and back
        waterline: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        heroPulse: 'heroPulse 14s ease-in-out infinite',
        waterline: 'waterline 8s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
