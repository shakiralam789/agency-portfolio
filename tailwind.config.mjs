/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#2B3932",
          light: "#F3F4F6",
          green: "#2B3932",
        },
        danger: "#EF4444",
        gray: {
          icon: "#6B7280",
          text: "#62786D",
          light: "#f3f4f6",
        },
        "body-color": "white",
        "green": {
          default: "#22c55e",
        },
      },
      spacing:{
        "header-height" : "68px"
      }
    },
  },
  plugins: [],
};

export default tailwindConfig;
