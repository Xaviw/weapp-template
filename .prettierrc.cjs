module.exports = {
  ...require('eslint-config-alloy/.prettierrc.js'),
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'angular' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
    {
      files: '*.wxs',
      options: { parser: 'babel' },
    },
  ],
};
