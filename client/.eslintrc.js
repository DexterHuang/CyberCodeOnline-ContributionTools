module.exports = {
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier',
    ],
    rules: {
      // NOTE: conflicts with prettier
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-curly-newline': 0,
      'react/jsx-indent': 0,
      'import/no-named-as-default-member': 0,
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 0,
      'no-use-before-define': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
          functions: false, // functions are hoisted, so safe
          classes: false, // outer scopes only, so usually safe
          variables: false, // outer scopes only i.e. for styled-components declarations
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      // NOTE: because we are using Typescript
      'react/prop-types': 'off',
      'no-underscore-dangle': 'off',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      // Semi needs no-unreachable and no-unexpected-multiline or it could cause runtime errors:
      // https://eslint.org/docs/rules/semi
      semi: [2, 'never'],
      'no-unreachable': 'error',
      'no-unexpected-multiline': 'error',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
      project: ['./tsconfig.json'],
      sourceType: 'module',
    },
    settings: {
      exclude: ['node_modules', 'build', '**/*.d.ts'],
      include: ['**/*.{ts,tsx,js,jsx}'],
      'import/resolver': {
        node: {
          paths: ['src', 'data', '.storybook'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
  }