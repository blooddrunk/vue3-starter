import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import withNuxt from './apps/web-nuxt/.nuxt/eslint.config.mjs';

const compat = new FlatCompat({
  // recommendedConfig: js.configs.recommended,
});

export default withNuxt(
  js.configs.recommended,

  ...compat.extends('@jn/eslint-config/prettier'),

  {
    languageOptions: {
      globals: {
        __DEV__: 'readonly',
      },
    },
  },

  {
    files: ['**/*.vue'],
    rules: {
      'no-unused-vars': 'error',
    },
  },
).override('nuxt:vue', {
  rules: {
    'vue/first-attribute-linebreak': 'off',
  },
});
