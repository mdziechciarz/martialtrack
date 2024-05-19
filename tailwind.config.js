// tailwind.config.js
import {nextui} from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // ...
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5AB8FB',
        secondary: '#2d3142',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

export default config;
