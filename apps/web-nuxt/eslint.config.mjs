import withNuxt from './.nuxt/eslint.config.mjs';

console.log(withNuxt);

export default withNuxt({
  languageOptions: {
    globals: {
      __DEV__: 'readonly',
    },
  },
})
  .prepend
  // ...Prepend some flat configs in front
  ()
  // Override some rules in a specific config, based on their name
  .override('vue', {
    rules: {
      // ...Override rules, for example:
      'vue/max-attributes-per-line': 'off',
    },
  });
