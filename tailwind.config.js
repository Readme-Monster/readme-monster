/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        textPrimary: "#343A40",
        textSecondary: "#868E96",
        textTertiary: "#CED4DA",
        textBlue: "#4B88FF",
        textBlueHover: "#2F73FA",
        textgreyHover: "#E0DEDE",
        textWhite: "#FFFFFF",
        textBlack: "#000000",
        darkPrimary: "#1e2937",
        darkSecondary: "#374152",
        darkTertiary: "#222222",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(#1e2937, #556274) !important", // 새 그라데이션 추가
        "gradient-test": "linear-gradient(white, #4B88FF) !important",
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
