const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },

      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
        },

        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },

        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
        },

        lighter: 'var(--color-lighter)',
        light: 'var(--color-light)',
        medium: 'var(--color-medium)',
        dark: 'var(--color-dark)',
        darker: 'var(--color-darker)',
      },

      spacing: {
        84: '21rem',
        88: '22rem',
      },

      borderWidth: {
        thin: 'thin',
      },

      backgroundColor: ({ theme }) => ({
        main: theme('colors.slate.100'),
      }),

      fontFamily: {
        sans: ['"Microsoft YaHei"', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
