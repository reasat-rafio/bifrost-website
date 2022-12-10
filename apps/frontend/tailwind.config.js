module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
          '3xl': '1680px',
        },
        padding: {
          DEFAULT: '1.6rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '11rem',
          '3xl': '10rem',
        },
        center: true,
      },
      colors: {
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
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
      },
      fontSize: {
        'head-1': '92px',
        'head-mobile': '52px',
        'head-2': '80px',
        'head-3': '62px',
        'head-4': '55px',
        'head-5': '26px',
        'head-6': '18px',
        'body-1': '18px',
        'body-2': '22px',
        'body-mobile': '17px',
        'body-3': '16px',
        'head-4-res': '35px',
        'body-1-res': '14px',
      },
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        titillium: 'Titillium Web, Helvetica, Arial, sans-serif',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ffffff',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
  // variants: {
  //   scrollbar: ['rounded'],
  // },
}
