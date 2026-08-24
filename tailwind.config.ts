import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        // Editorial dark / brutalist tokens (rediseño SellifyWorks)
        "sw-bg-0": "#000000",
        "sw-bg-1": "#0A0A0A",
        "sw-bg-2": "#111111",
        "sw-bg-3": "#1A1A1A",
        "sw-fg-1": "#FFFFFF",
        "sw-fg-2": "#D0D0D0",
        "sw-fg-3": "#888888",
        "sw-fg-4": "#555555",
        "sw-line": "#1F1F1F",
        "sw-line-strong": "#2A2A2A",
        "sw-brand": "#FF6B00",
        "sw-brand-hover": "#FF8533",
        "sw-brand-press": "#CC5500",
        // Color secundario: acentos, tags, números, hovers. El naranja queda
        // reservado exclusivamente para los CTA principales (contratar/hablar).
        "sw-secondary": "#7CB3E0",
        "sw-secondary-strong": "#2F5C84",
        "sw-success": "#00E58A",
        "sw-danger": "#FF4D4D",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "Menlo", "monospace"],
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
