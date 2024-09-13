import tsparser from '@typescript-eslint/parser'
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsparser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
