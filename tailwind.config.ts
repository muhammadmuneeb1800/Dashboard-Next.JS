import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0000AC",
        secondray: "#4F4F4F",
        light: "#E0E0E0",
        info: "#828282",
        success: "#FAFAFA",
      },
    },
  },
  plugins: [],
} satisfies Config;
