module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Mukta'],
        mono: ['"Fira Code"', 'ui-monospace'],
        display: ['Oswald'],
        body: ['"Open Sans"'],
      },
      animation: {
        fadeIn: 'fadeIn .8s ease-in-out',
        fadeInSpeed: 'fadeIn .3s ease-in-out',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
      colors: {
        primary: {
          50: 'var(--primary-color-50)',
          100: 'var(--primary-color-100)',
          200: 'var(--primary-color-200)',
          300: 'var(--primary-color-300)',
          400: 'var(--primary-color-400)',
          500: 'var(--primary-color-500)',
          600: 'var(--primary-color-600)',
          700: 'var(--primary-color-700)',
        },
        white: '#ffffff',
        'white-smooth': '#fbfbfb', //
        dark: '#1B2430',
        'dark-max': '#181e29',
      },
    },
  },
  plugins: [],
};
