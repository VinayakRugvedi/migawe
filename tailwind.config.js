/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'valentine',
      {
        valentineDark: {
          primary: '#ea7482',
          secondary: '#77dd77',
          accent: '#88dcdd',
          neutral: '#f0d6e8',
          'base-100': '#230e16',
        },
      },
    ],
  },
}
