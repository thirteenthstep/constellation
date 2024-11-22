module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.generated.ts', 'graphql.d.ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
      },
    },
  ],
};
