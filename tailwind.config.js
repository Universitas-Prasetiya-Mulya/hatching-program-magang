{import('tailwindcss').Config} 
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    colors: {
      black: '#171717',
      white: '#FEFEFE',
      primary: '#082658',
      cardlogin: '#ADB5C2',
      btnsignin: '#355590',
      bluenav: '#1D4485',
      bluehover: '#446AA8',
      red: '#FB2929',
      yellow: '#F2EA1B',
      grey: '#D1D1D6',
      greenstage: '#6BF954',
      greyfont: '#8F8F8F',
      bluefield: '#EEF5FF',
      excel: '#21A366',
      bluebutton: '#65C8FF'
    }
  },
}
