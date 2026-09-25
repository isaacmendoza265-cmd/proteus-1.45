// Configuración de ESLint (flat config).
// Criterio: los errores (error) son fallos reales que rompen la app;
// los avisos (warn) son deuda técnica a ir limpiando sin bloquear el CI.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', '_archivo/**', '_originales/**', 'SUBIR_A_GITHUB/**', 'temp_*/**', 'scripts/**', 'docs/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      // Fallos reales
      'react-hooks/rules-of-hooks': 'error',
      // Deuda técnica (no bloquea)
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-empty': 'warn',
      'prefer-const': 'warn',
      'no-useless-escape': 'warn',
      'no-case-declarations': 'warn',
    },
  },
);
