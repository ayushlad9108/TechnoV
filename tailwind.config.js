/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                industrial: {
                    bg: {
                        primary: '#0A0F14',
                        secondary: '#111821',
                    },
                    border: '#1E293B',
                    text: {
                        primary: '#F5F7FA',
                        secondary: '#A3AAB7',
                    },
                    accent: '#2563EB',
                    highlight: '#F59E0B',
                }
            },
            fontFamily: {
                display: ['"Clash Display"', 'Inter', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                // keep serif alias pointing to Clash Display for backward compat
                serif: ['"Clash Display"', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'industrial-gradient': 'linear-gradient(135deg, #111821 0%, #0A0F14 100%)',
            },
            screens: {
                'xs': '320px',
                'sm': '640px',
                'md': '768px',
                'lg': '1025px',
                'xl': '1280px',
                '2xl': '1441px',
            },
        },
    },
    plugins: [],
}
