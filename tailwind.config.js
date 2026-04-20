/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D1117',
        navy2: '#161B22',
        navy3: '#21262D',
        cyan: '#00E5FF',
        'cyan-dim': 'rgba(0,229,255,0.1)',
        green: '#00FF88',
        'green-dim': 'rgba(0,255,136,0.1)',
        amber: '#FFD86B',
        purple: '#C878FF',
        border: '#30363D',
        muted: '#8B949E',
        'text-main': '#E6EDF3',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
};
