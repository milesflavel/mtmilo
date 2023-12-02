/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          pink: "#ff55b3",
          green: "#1df47f",
          yellow: "#f8dc00",
          cyan: "#19e9fe",
          purple: "#a577fe",
        },
        purple: {
          50: "#efeffe",
          100: "#e2e2fd",
          200: "#cdcbfa",
          300: "#b0abf6",
          400: "#9789f0",
          500: "#886de7",
          600: "#7a51da",
          700: "#6a42c0",
          800: "#56389b",
          900: "#24193e",
          950: "#1f1634",
        },
      },
      borderRadius: {
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
