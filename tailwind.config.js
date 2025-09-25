/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#38E07A',
          dark: '#28C965',
        },
        danger: {
          DEFAULT: '#D11C1C',
          dark: '#B91C1C',
        },
        background: {
          DEFAULT: '#0f0f10',
          surface: '#1a1a1c ',
          border: '#2a2a2f ',
        },
        text: {
          primary: '#f4f4f5 ',
          secondary: '#a1a1aa ',
        },
      },
      fontFamily: {
        BoldRound: ['BoldRound', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
