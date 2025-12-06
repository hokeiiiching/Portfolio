/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Theme-aware colors using CSS variables
                cyber: {
                    bg: 'var(--color-bg)',
                    dark: 'var(--color-bg)',
                    panel: 'var(--color-panel)',
                    surface: 'var(--color-surface)',
                    border: 'rgba(var(--color-primary-rgb, 0, 245, 255), 0.2)',
                },
                neon: {
                    // Primary color (cyan in cyberpunk, green in matrix, pink in synthwave)
                    cyan: 'var(--color-primary)',
                    // Secondary color
                    magenta: 'var(--color-secondary)',
                    // Accent color
                    pink: 'var(--color-accent)',
                    // Semantic colors
                    green: 'var(--color-success)',
                    yellow: 'var(--color-warning)',
                    orange: 'var(--color-accent)',
                    blue: 'var(--color-primary)',
                },
                glow: {
                    cyan: 'var(--glow-primary)',
                    magenta: 'var(--glow-secondary)',
                    pink: 'var(--glow-secondary)',
                },
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
                cyber: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
            },
            boxShadow: {
                'neon-cyan': '0 0 10px rgba(0, 245, 255, 0.3), 0 0 20px rgba(0, 245, 255, 0.2), 0 0 40px rgba(0, 245, 255, 0.1)',
                'neon-magenta': '0 0 10px rgba(255, 0, 255, 0.3), 0 0 20px rgba(255, 0, 255, 0.2), 0 0 40px rgba(255, 0, 255, 0.1)',
                'neon-pink': '0 0 10px rgba(255, 20, 147, 0.3), 0 0 20px rgba(255, 20, 147, 0.2)',
                'window': '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 245, 255, 0.1)',
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'scan-line': 'scan-line 4s linear infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'scan-line': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
            },
        },
    },
    plugins: [],
}
