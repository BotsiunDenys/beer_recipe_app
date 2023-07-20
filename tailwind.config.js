/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
        transitionDuration: {
          DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
