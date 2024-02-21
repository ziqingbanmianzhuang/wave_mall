/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          1: "#ccc",
          2: "#666",
        },
        black: "#000",
        bgWhite: "#f5f5f5",
        fontBlack: "#2B2D42",
      },
    },
    plugins: [],
  },
};
