import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "blue-primary": "#3E21F3",
        "light-purple": "#C8BAFD",
        "purple-primary": "#ECE9FD"
      },
      fontFamily: {
        "dm-sans": ["DMSans", "sans-serif"],
        "fira-mono": ["FiraMono", "monospace"],
        sora: ["sora", "sans-serif"]
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700"
      }
    },
    fontFamily: {
      sans: ["FiraMono", "monospace"]
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
