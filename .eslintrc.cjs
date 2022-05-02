module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'comma-dangle': 0,
    semi: 0,
    'object-curly-newline': 0,
    'no-prototype-builtins': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'use-isnan': 'off',
    'no-restricted-globals': ['off', 'isNaN'],
    'implicit-arrow-linebreak': [0, 'below'],
    quotes: [2, 'single', 'avoid-escape'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        arrowParens: 'always',
        trailingComma: 'all',
        useTabs: false,
        tabWidth: 2,
        semi: true,
        printWidth: 100,
      },
    ],
  },
};
