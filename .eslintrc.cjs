/*
 * ESLint 7 配置
 */
module.exports = {
  root: true,
  extends: ['alloy'],
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    getApp: true,
    getCurrentPages: true,
    requirePlugin: true,
    requireMiniProgram: true,
    WXWebAssembly: true,
  },
  ignorePatterns: ['**/miniprogram_npm/*'],
  rules: {
    'no-invalid-this': 'off',
  },
  overrides: [
    {
      // overrides files 配置中的文件会在执行 eslint 命令时被检查
      // 等同于 --ext .wxs
      files: ['*.wxs'],
      // wxs 只能使用 ES5 语法
      parserOptions: {
        ecmaVersion: 5,
      },
      rules: {
        'no-var': 'off',
        'no-inner-declarations': 'off',
        'no-restricted-syntax': [
          'error',
          "VariableDeclaration[kind='const']",
          "VariableDeclaration[kind='let']",
          'ArrowFunctionExpression',
          'TemplateLiteral',
          'ClassDeclaration',
          'ImportDeclaration',
          'ExportNamedDeclaration',
          'ExportDefaultDeclaration',
          'ExportAllDeclaration',
          'RestElement',
          'SpreadElement',
          'ForOfStatement',
          'ObjectPattern',
          'ArrayPattern',
          'AssignmentPattern',
          "BinaryExpression[operator='**']",
          'AwaitExpression',
        ],
      },
    },
    // 其他特殊配置，例如多线程 Worker 代码中暴露全局 worker 对象
    // {
    //   files: ['worker.js'],
    //   globals: {
    //     worker: true,
    //   },
    // },
  ],
};
