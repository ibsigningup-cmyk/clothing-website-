/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        vermillion: '#E94B2A',
        periwinkle: '#A8B0D8',
        buttercream: '#E8D88A',
        charcoal: '#2E2A26',
        cream: '#F4E8D8',
      },
      fontFamily: {
        display: ['"Bodoni Moda Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Tight Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
