/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF5FF',
          100: '#D5E6FF',
          200: '#B3D1FF',
          300: '#84B5FF',
          400: '#5A94FF',
          500: '#387ED1', // Kite primary blue
          600: '#2D6CB9',
          700: '#225696',
          800: '#1E2B4D', // Kite dark blue
          900: '#12172E',
        },
        accent: {
          50: '#E6F7F5',
          100: '#CCEFEB',
          200: '#99DFD7',
          300: '#66CFC3',
          400: '#40C0AF',
          500: '#26A69A', // Kite green
          600: '#1E8A7E',
          700: '#166F65',
          800: '#0F544C',
          900: '#072A26',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};