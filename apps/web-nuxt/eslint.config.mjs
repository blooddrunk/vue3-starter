// import { FlatCompat } from '@eslint/eslintrc';

import withNuxt from './.nuxt/eslint.config.mjs';

// const compat = new FlatCompat();

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
  .override('nuxt:vue', {
    rules: {
      // ...Override rules, for example:
      // 'vue/max-attributes-per-line': 'off',
    },
  });
