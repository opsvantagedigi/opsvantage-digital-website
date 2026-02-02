import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "titan-accent": "hsl(var(--titan-accent))",
        "titan-midnight": "hsl(var(--ovd-midnight))",
      },
    },
  },
  plugins: [],
};
export default config;