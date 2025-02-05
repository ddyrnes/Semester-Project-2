/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#407CAF", // Brand primary color used for call-to-action elements
        disabled: "rgb(64, 124, 175 / 40%)", // Color for disabled or inactive buttons (same as primary but with opacity adjustments)
        primaryBackground: "#E5EEF5", // Primary background color
        input: "#EFEFEF", // Light gray used for form inputs and neutral UI elements
        primaryText: "#FAFAFA", // Primary Text Color
        dark: "#403D3D", // Dark color for text and background
      },
      fontSize: {
        h1: "32px",
        h2: "24px",
        h3: "20px",
        priceDate: "18px",
        button: "18px",
        body: "16px",
        menu: "14px",
        label: "14px",
        search: "12px",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
        extraBold: "800",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Set Roboto as the default font for everything
      },
    },
  },
  plugins: [],
};
