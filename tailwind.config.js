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
      // Add small/large/dynamic viewport units
      // https://medium.com/@dpoulton1/adding-large-small-and-dynamic-viewport-units-to-tailwind-css-8fb9105da11d
      minHeight: {
        "screen-svh": ["100vh", "100svh"],
        "screen-lvh": ["100vh", "100lvh"],
        "screen-dvh": ["100vh", "100dvh"],
      },
      height: {
        "screen-svh": ["100vh", "100svh"],
        "screen-lvh": ["100vh", "100lvh"],
        "screen-dvh": ["100vh", "100dvh"],
      },
      maxHeight: {
        "screen-svh": ["100vh", "100svh"],
        "screen-lvh": ["100vh", "100lvh"],
        "screen-dvh": ["100vh", "100dvh"],
      },
      minWidth: {
        "screen-svw": ["100vw", "100svw"],
        "screen-lvw": ["100vw", "100lvw"],
        "screen-dvw": ["100vw", "100dvw"],
      },
      width: {
        "screen-svw": ["100vw", "100svw"],
        "screen-lvw": ["100vw", "100lvw"],
        "screen-dvw": ["100vw", "100dvw"],
      },
      maxWidth: {
        "screen-svw": ["100vw", "100svw"],
        "screen-lvw": ["100vw", "100lvw"],
        "screen-dvw": ["100vw", "100dvw"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
