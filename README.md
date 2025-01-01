# 小程序开发模版

## 编辑器配置

1. 微信开发者工具支持 `.vscode/settings.json`
2. 设置等同 editorconfig 的格式化相关配置
3. 其他编辑器和插件配置

## ESLint

1. 安装插件
2. 安装插件支持的 npm 包版本（`eslint@7`），相关包也需要降级
3. 配置 `.eslintrc.cjs`（仅支持 cjs）
4. 编辑器配置中开启保存时自动修复，以及对 `.wxs` 格式支持
5. `package.json` 中添加 `lint` 和 `lint:fix` 命令，以及 lint-staged 配置

## Prettier

1. 安装插件
2. 安装插件支持的 npm 包版本（`prettier@2`）
3. 配置 `.prettierrc.cjs`（仅支持 cjs），并为 `.wxs`、`.wxml`、`.wxss` 格式指定解析器，`wxml` 解析器指定为 `angular` 可以格式化插值表达式
4. 配置 `.prettierignore` 文件
5. 编辑器配置中设置 prettier 为各文件的默认格式化器，以及对 `.wxs`、`.wxml`、`.wxss` 格式支持
6. `package.json` 中添加 `format` 命令，以及 lint-staged 配置
