/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
      globals: globals.node,
    },
    rules: {
      // TypeScript-ESLint rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
        },
      ],
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-unused-expressions': ['error'],
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],

      // Import rules
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/extensions': 'off',

      // ESLint rules
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-nested-ternary': 'error',
      'no-lonely-if': 'warn',
      'no-undefined': 'warn',
      'no-unexpected-multiline': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-unused-vars': 'off',
      'max-params': ['error', 5],
      'max-depth': ['warn', 4],
    },
  },
  tseslint.configs.recommended,
  // Lint JSON files. Visit https://github.com/eslint/json
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    ignores: ['package-lock.json', '**/tsconfig*.json'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
    ignores: ['package-lock.json', '**/tsconfig*.json'],
  },
  // Visit https://github.com/eslint/markdown
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  // Disable ESLint formatting rules that conflict with Prettier
  eslintConfigPrettier,
]);
