module.exports = {
    rules: {
        indent: [2, 4],
        semi: [2, 'never'],
        'no-console': ['error', { allow: ['warn', 'error', 'debug', 'info'] }],
        'comma-dangle': ['error', 'never']
    },
    extends: 'airbnb-base',
    plugins: [
        'import'
    ]
}