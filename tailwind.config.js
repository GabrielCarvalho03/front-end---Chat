/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#09BAE1"
      },
      borderWidth :{
        "0.5": "0.5px"
      }
    },
  },
  plugins: [],
}

