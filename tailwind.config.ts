import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#2C5F2E',
          light: '#3A7D3C',
          dark: '#1E4220',
        },
        gold: {
          DEFAULT: '#C9952A',
          light: '#E0AC40',
          dark: '#A67A1E',
        },
        cream: {
          DEFAULT: '#FAFAF7',
          dark: '#F0EFE8',
        },
        ink: '#1C1C1A',
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          lg: '2rem',
        },
        screens: {
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}
export default config
