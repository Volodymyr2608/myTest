module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        toastIn: {
          '0%': {rigth: 0, opacity: 0},
          '100%': {right: '1rem', opacity: '1'}
        },
        toastOut: {
          '0%': {right: '1rem', opacity: '1'},
          '100%': {rigth: 0, opacity: 0}
        },
      },
      animation: {
        toast: 'toastIn 1s, toastOut 1s 3.5s'
      }
    },
    container: [],
  },
  variants: {
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
