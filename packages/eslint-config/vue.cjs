module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-prettier',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off', // respect prettier
    'vue/html-self-closing': 'off',
  },
};
