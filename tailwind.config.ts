import type { Config } from 'tailwindcss';

const WIDTH = {
  pj: '1180px',
  13: '52px',
  14: '56px',
  15: '60px',
  30: '120px',
  34: '136px',
  35: '140px',
  36: '144px',
  39: '156px',
  49: '196px',
  50: '200px',
  56: '224px',
  67: '268px',
  75: '300px',
  85: '340px',
  90: '360px',
  100: '400px',
  105: '420px',
  120: '480px',
  130: '520px',
  140: '560px',
  160: '640px',
  144: '576px',
  150: '600px',
  192: '768px',
  216: '864px',
  221: '884px',
  230: '920px',
  256: '1024px',
};
const HEIGHT = {
  pj: '800px',
  4.5: '18px',
  11: '44px',
  13: '52px',
  14: '56px',
  15: '60px',
  28: '112px',
  29: '116px',
  30: '120px',
  34: '136px',
  18: '72px',
  46: '184px',
  47: '188px',
  48: '192px',
  50: '200px',
  65: '260px',
  75: '300px',
  77: '308px',
  144: '576px',
  150: '600px',
  160: '640px',
  168: '672px',
};
const MARGIN_AND_PADDING = {
  5.25: '21px',
  6: '24px',
  10: '40px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  18: '72px',
  30: '120px',
  45: '180px',
};
const GAP = {
  8: '32px',
  18: '72px',
};

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  plugins: [],
  theme: {
    extend: {
      width: WIDTH,
      maxWidth: WIDTH,
      minWidth: WIDTH,
      height: HEIGHT,
      maxHeight: HEIGHT,
      minHeight: HEIGHT,
      margin: MARGIN_AND_PADDING,
      padding: MARGIN_AND_PADDING,
      gap: GAP,
      colors: {
        primary: {
          DEFAULT: '#3893D8',
          600: '#D7EBFA',
          100: '#EEF8FF',
        },
        'pj-navy': {
          DEFAULT: '#00335A',
        },
        'pj-red': {
          DEFAULT: '#ED1C1C',
        },
        'pj-black': {
          DEFAULT: '#0F0A05',
        },
        'pj-gray': {
          DEFAULT: '#5B5B5B',
          800: '#9C9C9C',
          600: '#CCCCCC',
          400: '#E4E4E4',
          200: '#F4F4F4',
        },
        'pj-yellow': {
          DEFAULT: '#FFA928',
          100: '#FFF2DE',
        },
        'pj-white': {
          DEFAULT: '#FFFFFF',
        },
      },
      fontSize: {
        lg: '18px',
        '1.5xl': '22px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '40px',
        '7xl': '44px',
        '8xl': '48px',
      },
      zIndex: {
        500: '500',
        999: '999',
      },
      opacity: {
        pj: '0.7',
      },
      transitionDuration: {
        pj: '300ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'fade-out': 'fadeOut 0.3s ease-out',
      },
    },
  },
};
export default config;
