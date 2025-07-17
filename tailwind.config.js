/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './app/components/**/*.{js,jsx,ts,tsx}',
    './app/stories/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'public-sans': ['Public Sans', 'sans-serif'],
      },
      colors: {
        primary: '#022A9A',
        dark: '#313643',
        white: '#FFFFFF',
        gray: '#565656',
        neutral: '#606882',
        success: '#1C8367',
      },
    },
  },
  plugins: [],
};
