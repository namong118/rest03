/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
      colors: {
        brand: {
          50: '#EBF8FF',
          100: '#D0EFFA',
          200: '#A1DFFF',
          300: '#6CCBEE',
          400: '#4DBBDB',
          500: '#2DA4C8',
          600: '#1E8AAB',
          700: '#166F8E',
          800: '#0F5471',
          900: '#0A3A52',
          DEFAULT: '#4DBBDB',
        },
        sage: {
          50: '#EDFAF5',
          100: '#CCEFEB',
          200: '#99DFD7',
          300: '#66CFC2',
          400: '#3CBFA6',
          500: '#22A890',
          DEFAULT: '#3CBFA6',
        },
        iris: {
          50: '#F2EFFE',
          100: '#E3DCFD',
          200: '#C5B9FB',
          300: '#A796F5',
          400: '#8B78F0',
          500: '#7060E8',
          DEFAULT: '#8B78F0',
        },
        sol: {
          50: '#FFF8EC',
          100: '#FFECC7',
          200: '#FFD98B',
          300: '#FFBF4E',
          400: '#FFA421',
          500: '#F08512',
          DEFAULT: '#FFA421',
        },
        ink: {
          50: '#ECF1F9',
          100: '#D0DDEF',
          200: '#A0BBE0',
          300: '#6E96CE',
          800: '#0F2D50',
          900: '#081E38',
          950: '#040F1F',
          DEFAULT: '#0F2D50',
        },
      },
    },
  },
  plugins: [],
}
