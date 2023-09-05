module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: ['@typescript-eslint'],
    root: true,
    "env": {
        "jest": true
    }
}