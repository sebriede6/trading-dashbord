// Monorepo ESLint config for both frontend (React) and backend (Node.js)
import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  // Backend config
  {
    files: ["backend/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      env: { node: true },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    ignores: ['backend/node_modules/**'],
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
  // Frontend config
  {
    files: ["frontend/**/*.js", "frontend/**/*.jsx"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      env: { browser: true },
    },
    ignores: ['frontend/node_modules/**'],
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
