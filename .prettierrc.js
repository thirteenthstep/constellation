module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ["^@constellation/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
};
