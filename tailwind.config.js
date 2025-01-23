/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#407CAF", // Brand primary color used for call-to-action elements
        disabled: "rgb(64, 124, 175 / 40%)", // Color for disabled or inactive buttons (same as primary but with opacity adjustments)
        background: "#E5EEF5", // Primary background color for a clean and modern interface
        inputGray: "#EFEFEF", // Light gray used for form inputs and neutral UI elements
        primaryText: "#FAFAFA", // Primary Text Color
        dark: "#403D3D", // Dark text color for readability on bright backgrounds
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Set Roboto as the default font for everything
      },
    },
  },
  plugins: [],
};
