/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/App.tsx",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        woodsmoke: {
          50: "#f6f6f7",
          100: "#e1e2e6",
          200: "#c3c4cc",
          300: "#9e9faa",
          400: "#797a88",
          500: "#5f5f6d",
          600: "#4b4b56",
          700: "#3e3e47",
          800: "#34353b",
          900: "#09090a",
        },
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
