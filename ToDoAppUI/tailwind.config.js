/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '320px',   // Custom small breakpoint
        'md': '768px',   // Custom medium breakpoint
        'lg': '1024px',  // Custom large breakpoint
        'xl': '1400px',  // Custom extra-large breakpoint
      },
      scale: ['hover'],
    },
  },
  plugins: [],
}
