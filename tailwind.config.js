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
        backgroundWhite: "#f5f5f5",
        fontBlack: "#2B2D42",
        fontGray: "#b4b5c5",
        backgroundGreen: "#22c55e",
      },
      keyframes: {
        transformLoad: {
          "0%, 100%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(50%)" },
        },
      },
      animation: {
        transformLoad: "transformLoad 1s ease-in-out infinite",
        transformLoadDelay: "transformLoad 1s ease-in-out 0.5s infinite",
      },
    },
    plugins: [],
  },
};
