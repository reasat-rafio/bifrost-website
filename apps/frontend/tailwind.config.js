module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1680px',
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
        padding: {
          DEFAULT: '1.6rem',
          sm: '2rem',
          lg: '2rem',
          xl: '8rem',
          '2xl': '4rem',
        },
        center: true,
      },
      colors: {
        heading: '#000',
        description: '#183B56',

        pinkSugar: '#E7ADFF',
        riceFlower: '#EEFFE9',
        honeySuckle: '#C9FF71',
        neonBlue: '#7187FF',

        warning: '#F3CD68',
        danger: '#E95432',
        danger2: '#F3E5E8',
        secondary: '#183B56',
        success: '#2EFFB2',
        gray: '#B3BAC5',
      },
      fontSize: {
        'head-1': ['92px', '92px'],
        'head-2': ['80px', '96px'],
        'head-3': ['62px', '90px'],
        'head-4': ['55px', '55px'],
        'head-5': ['26px', '39px'],
        'head-6': ['18px', '20px'],
        'body-1': ['18px', '32px'],
        'body-2': ['22px', '32px'],
        'body-3': ['16px', '24px'],
      },
      fontFamily: {
        titillium: 'Titillium Web, Helvetica, Arial, sans-serif',
      },
    },
  },
  plugins: [],
}
