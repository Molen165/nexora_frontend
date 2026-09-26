/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#111827',
        cardbg: '#1F2937',
        nexoraBlue: '#2563EB',
        nexoraGreen: '#10B981',
      }
    },
  },
  plugins: [],
}