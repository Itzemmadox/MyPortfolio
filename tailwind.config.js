/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          'deep-indigo': '#1a1f3a',
          'electric-cyan': '#00d4ff',
          'warm-slate': '#2d3748',
        },
        secondary: {
          'vibrant-coral': '#ff6b6b',
          'golden-amber': '#f59e0b',
          'deep-teal': '#14b8a6',
        },
        accent: {
          'neon-lime': '#84cc16',
          'royal-purple': '#8b5cf6',
          'sunset-orange': '#fb923c',
        },
        functional: {
          success: '#10b981',
          error: '#ef4444',
          warning: '#f59e0b',
          neutral: '#64748b',
        },
        text: {
          primary: '#0f172a',
          secondary: '#475569',
        },
      },
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
        'urbanist': ['Urbanist', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': '4.5rem',
      },
      fontWeight: {
        'h1': '900',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
        'gradient-bg': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'gradient-dark': 'radial-gradient(circle, #1a1f3a, #0a0f1e)',
        'gradient-timeline': 'linear-gradient(180deg, #00d4ff, #8b5cf6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-border': 'rotate-border 3s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff' },
        },
        'rotate-border': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: '#00d4ff' },
        },
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4,0,0.2,1)',
        'emphasis': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}

