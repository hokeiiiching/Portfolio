/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    bg: '#0a0a0f',
                    dark: '#0d1117',
                    panel: '#141922',
                    surface: '#1a1f2e',
                    border: '#2a3441',
                },
                neon: {
                    cyan: '#00f5ff',
                    magenta: '#ff00ff',
                    pink: '#ff1493',
                    green: '#00ff9f',
                    yellow: '#ffff00',
                    orange: '#ff6600',
                    blue: '#0066ff',
                },
                glow: {
                    cyan: 'rgba(0, 245, 255, 0.5)',
                    magenta: 'rgba(255, 0, 255, 0.5)',
                    pink: 'rgba(255, 20, 147, 0.5)',
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
