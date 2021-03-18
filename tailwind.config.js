module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'display' : ['Playfair Display']
    }
  },
  variants: {
    extend: {
      display: ["group-hover"],
      margin: ["group-hover"],
      visibility: ["group-hover"],
      scale: ["group-hover"],
      overflow: ["group-hover"],
      translate: ["group-hover"],
      textColor: ['visited'],
      textDecoration: ['active']
    },
  },
  plugins: [
    require('tailwind-filter-utilities')
  ],
}
