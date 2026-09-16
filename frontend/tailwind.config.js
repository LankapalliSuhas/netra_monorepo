/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netra-critical': '#ef4444',
        'netra-warning': '#f59e0b',
        'netra-live': '#4ade80'
      }
    },
  },
  plugins: [],
}
