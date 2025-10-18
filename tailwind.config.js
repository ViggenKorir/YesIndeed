/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Make DS Indigo the default sans-serif across the project.
        // Ensure DS Indigo is available (local @font-face or external stylesheet).
        sans: [
          "DS Indigo",
          "DSIndigo",
          "Helvetica",
          "Arial",
          "sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Noto Sans",
        ],
      },
    },
  },
  plugins: [],
};
