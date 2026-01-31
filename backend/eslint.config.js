// ESLint config for backend (Node.js, ES modules)
import js from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    ignores: ["node_modules/**"],
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
    },
  },
];
