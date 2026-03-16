const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sunshine: {
          blue:   '#2B7DBF',
          sky:    '#6BB6E8',
          yellow: '#FFC72C',
          light:  '#F4F9FF',
          dark:   '#1E2A38',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = config;
