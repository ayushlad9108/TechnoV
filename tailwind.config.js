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
                        primary: '#12161A',
                        secondary: '#1B2229',
                    },
                    border: '#2E3A45',
                    text: {
                        primary: '#E5E7EB',
                        secondary: '#9CA3AF',
                    },
                    accent: '#0EA5E9',
                    highlight: '#F59E0B',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'industrial-gradient': 'linear-gradient(135deg, #1B2229 0%, #0E1114 100%)',
            }
        },
    },
    plugins: [],
}
