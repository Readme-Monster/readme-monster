/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#343A40",
        textSecondary: "#868E96",
        textBlue: "#4B88FF",
      }
    },
  },
  plugins: [],
};