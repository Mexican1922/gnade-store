/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gnade-dark": "#1B5E20",
        "gnade-mid": "#2E7D32",
        "gnade-light": "#4CAF50",
        "gnade-pale": "#F1F8F1",
        "gnade-pink": "#F8E8EE",
        "gnade-pink-mid": "#E8A0B4",
        "gnade-cream": "#FAFAF8",
        "gnade-black": "#0F1A10",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
