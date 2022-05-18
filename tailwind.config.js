module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'cust-green': '#8AA584',
        'cust-green-200': '#6D8368',
        'opacity-green': '#C2D2BE'
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('./assets/image/farm.jpg'))",
     },
    },
  },
  plugins: [require('daisyui')],
}
