/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './index.html'
  ],
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#222',
      blacker: '#666',
      normal: '#aa9',
      fire: '#f42',
      water: '#39f',
      electric: '#fc3',
      grass: '#7c5',
      ice: '#6cf',
      fighting: '#b54',
      poison: '#a59',
      ground: '#db5',
      flying: '#89f',
      psychic: '#f59',
      bug: '#ab2',
      rock: '#ba6',
      ghost: '#66b',
      dragon: '#76e',
      dark: '#754',
      steel: '#aab',
      fairy: '#e9e',
      ironclad: '#981121',
      silent: '#008060',
      watcher: '#5900b3',
      defect: '#005c99',
      colorless: '#737373',
      curse: '#181818'
    },
    screens: {
      'iphone': '390px',
      // => @media (min-width: 390px) { ... }
      'tablet': '601px',
      // => @media (min-width: 601px) { ... }
    },
  },
  plugins: [],
}

