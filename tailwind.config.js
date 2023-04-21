module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        extend: {
            backgroundImage: theme => ({
                'welcome': "url('/images/welcome/home-page.jpeg')",
            }),
            boxShadow: {
                'pattern': ' 0px 0px 5px 1px rgba(0, 0, 0, 0.31)',
                'pattern2': '3px 11px 15px -1px #000000',
            },
            colors: {
                'blue-header-bg': "#537FBC",
                'blue-dark': 'rgba(29, 53, 87)',
                'blue-ligth': '#EBF3FF',
                'blue-primary': '#1877F2',
                'blue-regular': '#1A6ED8',
                'secundary': '#cce2ff',
                'notification-text': '#E41E3F',
                'green-primary': '#8BC34A',
                'bg-gray': '#F0F2F5',
                'comment': '#A8DADC'
            },
            keyframes: {
                openEffect: {
                    '0%': { opacity: 0 },
                    '25%': { opacity: 0.25 },
                    '50%': { opacity: 0.5 },
                    '75%': { opacity: 0.75 },
                    '100%': { opacity: 1 },
                },
                openItems: {
                    '0%': { transform: 'translateY(-500px)' },
                    '100%': { transform: 'translateY(0)' },
                    '0%': { opacity: 0 },
                    '25%': { opacity: 0.25 },
                    '50%': { opacity: 0.5 },
                    '75%': { opacity: 0.75 },
                    '100%': { opacity: 1 },
                },
                closeEffect: {
                    '0%': { opacity: 1 },
                    '25%': { opacity: 0.75 },
                    '50%': { opacity: 0.5 },
                    '75%': { opacity: 0.25 },
                    '100%': { opacity: 0 },
                },        
            },
            animation: {
                'openOpacity': 'openEffect 0.5s linear',
                'closeAuthMenu': 'closeEffect 2s linear',
                'openItems': 'openItems 0.5s linear',
                'closeCart': 'closeCartEffect 0.2s linear',
            }, 
        }
    },
    plugins: [],
  };