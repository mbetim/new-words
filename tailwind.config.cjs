/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#004ea8",
        },
        contrast: {
          primary: "#ffffff",
          secondary: "#d1d5db",
          dark: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
