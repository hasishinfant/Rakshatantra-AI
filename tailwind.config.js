/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00e5ff',
        'neon-green': '#00ff9d',
        'neon-yellow': '#ffb300',
        'neon-red': '#ff3366',
        'bg-void': '#020810',
        'bg-deep': '#060d1a',
        'bg-panel': '#080f1f',
        'bg-card': '#0b1526',
        'bg-elevated': '#0f1c30',
        'text-primary': '#e8f4fd',
        'text-secondary': '#7aa3c4',
        'text-muted': '#3d6080',
        'border-bright': 'rgba(0,229,255,0.3)',
      },
      fontFamily: {
        hud: ['Orbitron', 'monospace'],
        body: ['Exo 2', 'sans-serif'],
      },
      backgroundImage: {
        'linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'linear-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'linear-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(0,229,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 229, 255, 0.15)',
      },
      animation: {
        'scan-down': 'scanDown 3s linear infinite',
      },
      keyframes: {
        scanDown: {
          '0%': { top: '0%', opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
