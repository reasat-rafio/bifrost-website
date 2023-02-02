module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1680px',
      },
      container: {
        center: true,
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
      },
      colors: {
        pinkSugar: '#E7ADFF',
        riceFlower: '#EEFFE9',
        honeySuckle: '#C9FF71',
        warning: '#F3CD68',
        danger: '#E95432',
        danger2: '#F3E5E8',
        success: '#2EFFB2',
        gray: '#B3BAC5',

        neonBlue: '#7E6BF2',
        teal: '#70FCEB',

        primary: '#B37AF8',
        secondary: '#29394A',
        mauve: '#B794FF',
        'color-description': '#99A2D4',

        warning: '#F3CD68',
        'worning-soft': '#FCF5E4',
        danger: '#E95432',
        'danger-soft': '#F3E5E8',
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
      },
      borderRadius: {
        primary: '15px',
      },
      fontWeight: {
        primary: 275,
      },
      fontSize: {
        'head-1': '92px',
        'head-2': '80px',
        'head-3': '62px',
        'head-4': '55px',
        'head-md': '42px',
        'head-5': '26px',
        'head-6': '18px',
        'body-1': '18px',
        'body-2': '22px',
        'body-3': '16px',
        'head-1-mobile': '52px',
        'head-2-mobile': '54px',
        'head-3-mobile': '31px',
        'head-4-mobile': '28px',
        'body-1-mobile': '14px',
        'body-2-mobile': '17px',
        'head-4-res': '35px',
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
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
    require('prettier-plugin-tailwindcss'),
  ],
  // variants: {
  //   scrollbar: ['rounded'],
  // },
}
