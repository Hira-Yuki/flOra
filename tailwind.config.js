/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widget/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        floraGreen: '#576238',
        floraOlive: '#AFA065',
        floraYellow: '#FFD95E',
        floraBeige: '#F6F3ED',
        floraWhite: '#f9f9f9',
        mainText: '#3c3c3c',
        descText: '#666666',
        subText: '#929292',
        indexRed: '#FA897B',
        indexYellow: '#FFDD94',
        indexGreen: '#D0E6A5',
        indexCyan: '#86DDE3',
        indexRa: '#CCABD8',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'], // light theme, dark theme
  },
};
