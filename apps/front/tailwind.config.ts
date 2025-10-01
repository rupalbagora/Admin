import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // your components/pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
