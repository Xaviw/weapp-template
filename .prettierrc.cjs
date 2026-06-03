module.exports = {
  ...require('eslint-config-alloy/.prettierrc.js'),
  plugins: [require.resolve("@xaviw/prettier-plugin-wxml")],
  overrides: [
    {
      files: '*.wxml',
      // 解析器指定为 angular 可以格式化插值表达式
      options: { parser: 'wxml' },
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
