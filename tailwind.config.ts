import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "lightblue-50": "#eff3fb",
        "lightblue-100": "#dfe6f7",
        "lightblue-200": "#bfceee",
        "lightblue-300": "#9fb5e6",
        "lightblue-400": "#71acef",
        "lightblue-500": "#4e97eb",
        "lightblue-600": "#3e79bc",
        "lightblue-700": "#2f5b8d",
        "lightblue-800": "#1f3c5e",
        "lightblue-900": "#101e2f",
        "lightblue-950": "#090d15",
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
