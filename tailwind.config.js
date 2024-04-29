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
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
      colors: {
        white: '#ffffff',
        dark: '#1B2430',
      },
    },
  },
  plugins: [],
};
