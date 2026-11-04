/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B132B',
          dark: '#070D1E',
          deep: '#0F1A3A',
          surface: '#15244E',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        secondary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
          vibrant: '#1E40AF',
          glow: 'rgba(37, 99, 235, 0.35)',
        },
        accent: {
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
          light: '#22D3EE',
          electric: '#00F2FE',
          glow: 'rgba(6, 182, 212, 0.35)',
        },
        brand: {
          indigo: '#4F46E5',
          violet: '#6366F1',
          teal: '#14B8A6',
          sky: '#0EA5E9',
        },
        mainBg: '#FFFFFF',
        altBg: '#F8FAFC',
        cardBg: '#FFFFFF',
        mainText: '#0F172A',
        secondaryText: '#475569',
        mutedText: '#64748B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 40px -5px rgba(37, 99, 235, 0.3)',
        'glow-accent': '0 0 40px -5px rgba(6, 182, 212, 0.35)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.25)',
        'card-subtle': '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 35px -8px rgba(37, 99, 235, 0.12), 0 0 0 1px rgba(37, 99, 235, 0.15)',
        'glass': '0 8px 32px 0 rgba(11, 19, 43, 0.12)',
        'elevated': '0 10px 30px -5px rgba(11, 19, 43, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #070D1E 0%, #0E1C3D 50%, #081128 100%)',
        'gradient-button': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #0891B2 100%)',
        'gradient-button-hover': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #06B6D4 100%)',
        'gradient-text': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #06B6D4 100%)',
        'gradient-text-light': 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #2DD4BF 100%)',
        'gradient-card': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        'gradient-dark-card': 'linear-gradient(180deg, rgba(15, 26, 58, 0.9) 0%, rgba(11, 19, 43, 0.95) 100%)',
      },
    },
  },
  plugins: [],
}
