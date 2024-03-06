module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'warn',
  },
};
