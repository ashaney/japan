/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'flexoki-black': '#100F0F',
        'flexoki-red': '#AF3029',
        'flexoki-green': '#66800B',
        'flexoki-yellow': '#AD8301',
        'flexoki-blue': '#205EA6',
        'flexoki-magenta': '#A02F6F',
        'flexoki-cyan': '#24837B',
        'flexoki-white': '#FFFCF0',
        'flexoki-950': '#121211',
        'flexoki-900': '#18171C',
        'flexoki-800': '#1F1E26',
        'flexoki-700': '#262539',
        'flexoki-600': '#2D2A52',
        'flexoki-500': '#35304F',
        'flexoki-400': '#424056',
        'flexoki-300': '#6C687F',
        'flexoki-200': '#949CBD',
        'flexoki-100': '#CDCFD0',
        'flexoki-50': '#E6E6E6',
        'paper': '#FFFCF0',
        'sidebar': '#F2F0E5',
        'border': '#E6E6E6',
        'text': '#100F0F',
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "12px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
