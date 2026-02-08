module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,ts,scss,css}',
        './public/**/*.{html,css}'
    ],
    safelist: [
        { pattern: /(bg|text|ring|shadow)-primary(\/\d+)?/ },
        'shadow-primary/20'
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#13ec37',
                'background-light': '#f6f8f6',
                'background-dark': '#102213'
            },
            fontFamily: {
                display: ['Inter']
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px'
            }
        }
    },
    plugins: []
};
