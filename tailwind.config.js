const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: false,
  mode: 'jit',
  plugins: [],
  purge: [
    '@pickle/components/**/*.tsx',
    'pages/**/*.tsx',
    'styles/global.scss'
  ],
  theme: {
    colors,
    extend: {
      colors: {
        accent: colors.lime,
        primary: colors.emerald
      }
    },
    fontFamily: {
      body: ['Satoshi', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    }
  },
  variants: {
    extend: {}
  }
}
