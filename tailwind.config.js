/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
      },
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",
          dark: "#0284c7",
          light: "#7dd3fc",
        },
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(60% 60% at 50% 0%, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 60%), radial-gradient(40% 40% at 80% 20%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 60%), radial-gradient(30% 30% at 10% 10%, rgba(236,72,153,0.16) 0%, rgba(236,72,153,0) 60%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.2) inset, 0 10px 30px rgba(2,132,199,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

