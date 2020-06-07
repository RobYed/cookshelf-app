module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        '@angular-eslint/eslint-plugin-template'
    ],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:@angular-eslint/recommended',
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { 'functions': false }],
        '@angular-eslint/directive-selector': [
            'error',
            { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
            'error',
            { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
    },
    overrides: [
        /**
         * This extra piece of configuration is necessary for the use of inline
         * templates within Component metadata, e.g.:
         *
         * @Component({
         *  template: `<h1>Hello, World!</h1>`
         * })
         */
        {
            files: ['*.component.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            plugins: ['@angular-eslint/template'],
            processor: '@angular-eslint/template/extract-inline-html',
        },
        /**
         * Within Jasmine tests referencing unbound methods is intentional
         */
        {
            files: ['*.spec.ts'],
            rules: {
                '@typescript-eslint/unbound-method': 'off'
            }
        }
    ],
};
