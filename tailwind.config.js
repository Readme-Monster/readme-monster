/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#343A40",
        textSecondary: "#868E96",
        textTertiary: "#CED4DA",
        textBlue: "#4B88FF",
        textBlueHover: "#2F73FA",
        textgreyHover: "#E0DEDE",
      },
      screens: {
        mobile: "768px",
        tablet: "1192px",
        sm: "768px",
        md: "1200px",
        lg: "1440px",
        xl: "1640px",
      },
    },
  },
  mode: "jit",
  plugins: [],
};
