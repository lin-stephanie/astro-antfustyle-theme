import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'

export default ts.config(
  {
    ignores: ['dist/**/*'], // default:["**/node_modules/", ".git/"]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest', // default
      sourceType: 'module', // default
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  prettier
)
