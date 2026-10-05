/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blush: '#FBE9EA',
          blushLight: '#FFF6F7',
          blushMedium: '#F5D7DA',
          rose: '#B3263E',
          roseHover: '#981F33',
          roseLight: '#FDF0F2',
          maroon: '#7A1530',
          maroonHover: '#641026',
          dark: '#380B16',
          charcoal: '#2D3139',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'Inter', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(179, 38, 62, 0.08)',
        'card': '0 10px 30px -4px rgba(122, 21, 48, 0.07)',
        'elevated': '0 20px 40px -6px rgba(122, 21, 48, 0.12)',
      }
    },
  },
  plugins: [],
}
