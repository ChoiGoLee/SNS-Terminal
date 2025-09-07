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
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
        },
        background: {
          DEFAULT: '#000000',
          surface: '#16181C',
          border: '#2F3336',
        },
        text: {
          primary: '#E7E9EA',
          secondary: '#71767B',
        },
      },
    },
  },
  plugins: [],
}
