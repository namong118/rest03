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
        // CSS 변수 기반 — data-palette 속성으로 런타임 교체 가능
        brand: {
          50:  'rgb(var(--brand-50)  / <alpha-value>)',
          100: 'rgb(var(--brand-100) / <alpha-value>)',
          200: 'rgb(var(--brand-200) / <alpha-value>)',
          300: 'rgb(var(--brand-300) / <alpha-value>)',
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
          800: 'rgb(var(--brand-800) / <alpha-value>)',
          900: 'rgb(var(--brand-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--brand-400) / <alpha-value>)',
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
