/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extends: {
      colors: {
        blue: "#233345",
      },
    },
  },
  plugins: [],
};
