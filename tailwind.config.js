/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 10px rgba(0, 0, 0, 0.5)',
        'glow-blue': '0 0 10px #3B82F6',
      },
    },
  },
  plugins: [],
};