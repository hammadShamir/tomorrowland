import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        sans: ['var(--font-secondary)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-primary)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        primary: "#ba9ed6",
        secondary: "#542a7e",
        foreground: "#17121c",
        accentColor: "#ff6b9d", // Changed to a bright pink accent
        background: "#ebe4f1"
      },
      animation: {
        flip: 'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        flip: {
          'from': { transform: 'rotateX(0deg)', transformOrigin: '50% bottom ', },
          'to': { transform: 'rotateX(180deg)', transformOrigin: '50% bottom ', }
        }
      },
      screens: {
        'xs': '375px',
        '400': '400px'
      },
    },
  },
  plugins: [],
};
export default config;
