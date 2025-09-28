import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier/flat'

export default ts.config(
  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: ['dist/', '.astro/', '.local/'],
  },
  {
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ts.configs.eslintRecommended,
  ts.configs.recommended,
  ts.configs.stylistic,
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  prettier,
  {
    rules: {
      // https://typescript-eslint.io/rules/no-unused-vars/
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // https://eslint.org/docs/latest/rules/no-unused-expressions
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
      // https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/label-has-associated-control/
      'astro/jsx-a11y/label-has-associated-control': 'off',
    },
  }
)
