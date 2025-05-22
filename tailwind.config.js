/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix': '#00ff00',
        'cyber-black': '#0a0a0a',
        'cyber-blue': '#00ffff',
        'cyber-pink': '#ff00ff',
        'terminal': '#1a1a1a',
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
        'matrix': ['VT323', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink .75s step-end infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
} 