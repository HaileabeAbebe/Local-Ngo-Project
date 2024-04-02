/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {},
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};
