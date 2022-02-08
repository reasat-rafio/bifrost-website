module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '7.5rem',
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        heading: '#000',
        description: '#183B56',

        pinkSugar: '#E7ADFF',
        riceFlower: '#EEFFE9',
        honeySuckle: '#C9FF71',
        neonBlue: '#7187FF',

        warning: '#F3CD68',
        warning: '#F3CD68',
        danger: '#E95432',
        danger2: '#F3E5E8',
        secondary: '#183B56',
        success: '#2EFFB2',
        gray: '#B3BAC5',
      },
      fontSize: {
        'head-1': ['92px', '92px'],
        'head-2': ['52px', '62px'],
        'head-3': ['32px', '40px'],
        'head-4': ['24px', '32px'],
        'head-5': ['20px', '24px'],
        'head-6': ['16px', '20px'],
        'body-1': ['14px', '24px'],
        'body-2': ['16px', '26px'],
        'body-3': ['18px', '28px'],
        'body-4': ['24px', '36px'],
      },
      fontFamily: {
        titillium: 'Titillium Web, Helvetica, Arial, sans-serif',
      },
    },
  },
  plugins: [],
}
