module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'spellcheck', 'sonarjs', 'import', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-filename-extension': [0],
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'id-length': [2, { min: 3, properties: 'never' }],
    'react/require-default-props': [2, { functions: 'defaultArguments' }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    // '@typescript-eslint/no-implicit-any-catch': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', { max: 4 }],
    'no-alert': 'error',
    // 'no-console': 'error',
    'no-delete-var': 'error',
    'no-const-assign': 'error',
    'no-unreachable': 'error',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Za-z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: 'Enum$',
          match: true,
        },
      },
    ],
    'spellcheck/spell-checker': [
      1,
      {
        comments: false,
        strings: false,
        templates: false,
        identifiers: true,
        lang: 'en_US',
        skipWords: [
          'Gfm',
          'dracula',
          'href',
          'blockquote',
          'axios',
          'Resize',
          'Textarea',
          'enum',
          'jsx',
          'pathname',
          'testid',
          'pangeia',
          'urls',
          'orchestrator',
          'globals',
          'matchers',
        ],
        minLength: 3,
      },
    ],
    // '@typescript-eslint/explicit-function-return-type': 'error',
    'import/no-unused-modules': [1, { unusedExports: true }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // '@typescript-eslint/typedef': [
    //   'error',
    //   {
    //     arrowParameter: true,
    //     variableDeclaration: true,
    //     variableDeclarationIgnoreFunction: true,
    //   },
    // ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
  },
};
