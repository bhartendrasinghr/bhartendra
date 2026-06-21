import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f1e9",
        card: "#fffdf8",
        ink: "#15242c",
        teal: "#0d3b44",
        "teal-dark": "#09303a",
        cyan: "#15a3b6",
        "cyan-light": "#9fd9e0",
        muted: "#51626b",
        faint: "#9aa6ab",
      },
      fontFamily: {
        serif: ["var(--font-spectral)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
