module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    cy: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'spellcheck', 'sonarjs', 'import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'id-length': [2, { min: 3, properties: 'never' }],
    'react/require-default-props': [2, { functions: 'defaultArguments' }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-implicit-any-catch': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', { max: 70, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', { max: 4 }],
    'no-alert': 'error',
    'no-console': 'error',
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
          'enum',
          'testid',
          'yggdrasil',
          'urls',
          'orchestrator',
          'globals',
          'matchers',
        ],
        minLength: 3,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'import/no-unused-modules': [1, { unusedExports: true }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
  },
};
