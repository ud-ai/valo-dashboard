import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "bg-primary": "var(--bg-primary)",
                "bg-secondary": "var(--bg-secondary)",
                "bg-card": "var(--bg-card)",
                "accent-red": "#ff4655",
                "accent-cyan": "#00d4aa",
                "accent-purple": "#9d4edd",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-muted": "var(--text-muted)",
                "border-color": "var(--border-color)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-1": "linear-gradient(135deg, #ff4655 0%, #9d4edd 100%)",
                "gradient-2": "linear-gradient(135deg, #00d4aa 0%, #00a3cc 100%)",
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                }
            },
            animation: {
                scanline: 'scanline 3s linear infinite',
            }
        },
    },
    plugins: [],
};
export default config;
