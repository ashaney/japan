import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Flexoki-inspired colors
        stone: {
          50: "#faf9f7",
          100: "#f2f0ed",
          200: "#e7e4df",
          300: "#d0ccc4",
          400: "#b8b3a9",
          500: "#a39d93",
          600: "#8b8680",
          700: "#6f6b66",
          800: "#5a5651",
          900: "#403e3a",
        },
        amber: {
          50: "#fefbf3",
          100: "#fdf4e1",
          200: "#fae6b8",
          300: "#f6d389",
          400: "#f1bc4f",
          500: "#eca72c",
          600: "#d18d1f",
          700: "#ad6f1a",
          800: "#8c571a",
          900: "#734819",
        },
        orange: {
          50: "#fef7f3",
          100: "#fdeee1",
          200: "#fad9b8",
          300: "#f6be89",
          400: "#f1984f",
          500: "#ec7c2c",
          600: "#d1631f",
          700: "#ad4e1a",
          800: "#8c3f1a",
          900: "#733519",
        },
        red: {
          50: "#fef4f3",
          100: "#fde6e1",
          200: "#fad1b8",
          300: "#f6b689",
          400: "#f1904f",
          500: "#ec742c",
          600: "#d1591f",
          700: "#ad441a",
          800: "#8c361a",
          900: "#732d19",
        },
        rose: {
          50: "#fef4f4",
          100: "#fde6e6",
          200: "#fad1d1",
          300: "#f6b6b6",
          400: "#f19090",
          500: "#ec7474",
          600: "#d15959",
          700: "#ad4444",
          800: "#8c3636",
          900: "#732d2d",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
