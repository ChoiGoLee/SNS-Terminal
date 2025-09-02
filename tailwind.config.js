/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#38E07A', // Main-Color
        sub: '#29382E', // Sub-Color
        text: {
          DEFAULT: '#FFFFFF', // Text-Color
          sub: '#9EB8A8', // Text-Sub-Color
        },
        background: '#121714', // Background-Color
      },
    },
  },
  plugins: [],
}
