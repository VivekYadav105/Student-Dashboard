/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#978CD0',
        secondary: '#D9DEEF',
      },
      fontFamily: {
        poppins: 'Poppins-Regular',
      },
    },
  },
  plugins: [],
};
