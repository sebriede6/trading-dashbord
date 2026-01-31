// Monorepo ESLint config for both frontend (React) and backend (Node.js)
import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  // Backend config
  {
    files: ["backend/**/*.js", "backend/**/*.mjs", "backend/**/*.cjs"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
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
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: ['frontend/node_modules/**'],
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
