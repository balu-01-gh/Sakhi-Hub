/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#E91E63', // Pink for women empowerment theme
                'secondary': '#9C27B0', // Purple
                'accent': '#FFC107', // Amber
                'soft-pink': '#FCE4EC',
                'soft-purple': '#F3E5F5',
            }
        },
    },
    plugins: [],
}
