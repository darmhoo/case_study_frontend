/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#e9e9e9",
        'secondary': "rgb(233, 233, 233)"
      }
    },
  },
  plugins: [],
}

