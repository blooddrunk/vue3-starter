module.exports = {
  extends: ['eslint:recommended', '@nuxt/eslint-config', '@vue/eslint-config-prettier',],

  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off', // respect prettier
    'vue/html-self-closing': 'off',
  },
}
