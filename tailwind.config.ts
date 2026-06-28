import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        steel: "var(--color-steel)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        muted: "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        soft: "0 24px 48px -12px rgba(15, 23, 42, 0.08), 0 8px 16px -8px rgba(15, 23, 42, 0.04)",
        glow: "0 8px 32px -8px rgba(37, 99, 235, 0.45)",
        float: "0 12px 40px -8px rgba(15, 23, 42, 0.12)",
      },
      transitionTimingFunction: {
        premium: "var(--ease-premium)",
      },
    },
  },
  plugins: [],
};

export default config;
