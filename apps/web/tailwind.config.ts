import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          DEFAULT: "#05060f",
          800: "#0b0d1f",
          700: "#111430",
          600: "#1a1e44"
        },
        official: "#22c55e",
        trade: "#3b82f6",
        accent: {
          cyan: "#22d3ee",
          violet: "#8b5cf6",
          gold: "#f59e0b",
          rose: "#f43f5e"
        }
      },
      fontFamily: {
        display: ["Orbitron", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(99, 102, 241, 0.55)",
        "glow-cyan": "0 0 40px -8px rgba(34, 211, 238, 0.5)",
        card: "0 8px 40px -12px rgba(0, 0, 0, 0.7)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
