/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B086A",
        secondary: "#E2DAFB",
        'e-yellow': "#DFFF78",
        'e-green': "#00F5BF",
      }
    },
  },
  plugins: [],
}