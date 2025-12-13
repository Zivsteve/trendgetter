module.exports = {
  printWidth: 120,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 300,
      },
    },
  ],
};
