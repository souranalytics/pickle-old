const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  plugins: [],
  purge: ['pages/**/*.tsx', 'components/**/*.tsx'],
  theme: {
    colors,
    extend: {}
  },
  variants: {
    extend: {}
  }
}
