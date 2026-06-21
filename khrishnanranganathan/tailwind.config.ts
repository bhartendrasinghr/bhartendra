import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep, considered navy — the executive voice
        ink: {
          50: "#f4f5f9",
          100: "#e6e8f1",
          200: "#c6cadd",
          300: "#9aa1c2",
          400: "#6b73a0",
          500: "#474d7e",
          600: "#333766",
          700: "#262a52",
          800: "#1a1d3d",
          900: "#11132b"
        },
        // Warm ivory paper — the editorial canvas
        paper: {
          DEFAULT: "#fbfaf6",
          50: "#fefefc",
          100: "#f7f5ee",
          200: "#efebdf",
          300: "#e3ddca"
        },
        // Brass / gold — the accent of distinction
        brass: {
          300: "#dcc079",
          400: "#cca94f",
          500: "#b8923e",
          600: "#9a7830",
          700: "#7a5f26"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 19, 43, 0.04), 0 8px 24px -12px rgba(17, 19, 43, 0.12)",
        "card-hover": "0 2px 4px rgba(17, 19, 43, 0.06), 0 16px 40px -16px rgba(17, 19, 43, 0.20)",
        brass: "0 10px 40px -12px rgba(184, 146, 62, 0.45)"
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
