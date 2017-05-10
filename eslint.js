module.exports = {
    rules: {
        'no-param-reassign': 'off',
        indent: [2, 4, { "SwitchCase": 1 }],
        semi: [2, 'never'],
        'no-console': ['error', { allow: ['warn', 'error', 'debug', 'info', 'main', 'game'] }],
        'comma-dangle': ['error', 'never']
    },
    extends: 'airbnb-base',
    plugins: [
        'import'
    ]
}
