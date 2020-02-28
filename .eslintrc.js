module.exports = {
  env: {
    "webextensions": true
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['babel'],
  rules: {
    quotes: ['error', 'single'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'babel/no-unused-expressions': 1,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        // jsxBracketSameLine: true,
      },
    ],
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "@typescript-eslint/consistent-type-assertions": "warn"
  },
}
