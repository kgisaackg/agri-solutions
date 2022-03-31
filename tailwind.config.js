module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'cust-green': '#8AA584',
        'cust-green-200': '#6D8368',
      }
    },
  },
  plugins: [require('daisyui')],
}
