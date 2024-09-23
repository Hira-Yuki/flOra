/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin'); // plugin을 올바르게 정의합니다.

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widget/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        floraGreen: '#33491B',
        floraOlive: '#AFA065',
        floraYellow: '#FFD60A',
        floraBeige: '#F6F3ED',
        floraWhite: '#f9f9f9',
        mainText: '#3c3c3c',
        descText: '#666666',
        subText: '#929292',
        objectGray: '#cecece',
        indexRed: '#FF5641',
        indexYellow: '#FFAE00',
        indexGreen: '#8CD300',
        indexCyan: '#22D3DE',
        indexLavender: '#A155BD',
      },
    },
  },
  safelist: [],
  plugins: [
    require('daisyui'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-custom': {
          /* 스크롤바 최소화 */
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cccccc',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#999999',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      });
    }),
  ],
  daisyui: {
    themes: ['light'], // light theme, dark theme
  },
};
