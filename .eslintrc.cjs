/*
 * ESLint 7 配置
 */
module.exports = {
  root: true,
  extends: ['alloy'],
  env: {
    es6: true,
  },
  parserOptions: {
    // ESLint 7.x 内置解析器最高支持到 2020
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  // 添加小程序中可能用到的全局声明
  globals: {
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    Behavior: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
    requirePlugin: 'readonly',
    requireMiniProgram: 'readonly',
    WXWebAssembly: 'readonly',
  },
  // ESLint 默认忽略 node_modules 和 . 开头目录，其余目录需要手动添加
  ignorePatterns: ['**/miniprogram_npm/**', '**/miniprogram_dist/**'],
  // overrides files 配置中的文件会在执行 eslint 命令时被检查
  overrides: [
    {
      files: ['**/*.wxs'],
      // wxs 只能使用 ES5 语法
      env: {
        es6: false,
      },
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      // 尽量禁用 wxs 不支持的语法（不完整，按情况扩展）
      rules: {
        'no-var': 'off',
        'no-inner-declarations': 'off',
        'object-shorthand': 'off',
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
    // 例如在脚本代码中启用 node 环境
    // {
    //   files: ['script.js'],
    //   env: {
    //     node: true,
    //   },
    // },
  ],
};
