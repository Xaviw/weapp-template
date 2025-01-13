# 模版做了些什么

## 编辑器配置

1. 微信开发者工具支持 `.vscode/settings.json`
2. 设置等同 editorconfig 的格式化相关配置
3. 其他编辑器和插件配置

## ESLint

1. 微信开发者工具中安装插件
2. 安装插件支持的 npm 包版本（`eslint@7`），相关包也需要降级
3. 配置 `.eslintrc.cjs`，包括 ignore 配置；设置小程序全局变量，单独设置 wxs 文件校验规则
4. 编辑器配置中开启保存时自动修复，以及对 `.wxs` 格式支持
5. `package.json` 中添加 `lint` 命令，以及 lint-staged 配置

## Prettier

1. 微信开发者工具中安装插件
2. 安装插件支持的 npm 包版本（`prettier@2`）
3. 配置 `.prettierrc.cjs`，并为 `.wxs`、`.wxml`、`.wxss` 格式指定解析器
4. 配置 `.prettierignore` 文件
5. 编辑器配置中设置 prettier 为各文件的默认格式化器，以及开启对 `.wxs`、`.wxml`、`.wxss` 格式支持
6. 通过 patch-package 修改 prettier 源码，让 htmlWhitespaceSensitivity 配置能够正确应用到小程序标签，让 wxs 标签格式化规则同 script 标签
7. `package.json` 中添加 `format` 命令，以及 lint-staged 配置

## Anim 框架

1. 增强原生小程序功能，具体查看[文档](https://digital.ssv.tencent.com/@ssv-lab/anim/)
2. 默认开启 “大同埋点” 插件，其他插件按需开启
3. Anim 构造器自带发布订阅方法：`$on`、`$emit`、`$off`、`$offAll`、`$clear`
4. `Anim.$utils` 中包含几个实用方法：`getUrlSearch`、`getUrlWithoutSearch`、`urlJoinQuery`、`safeJsonStringify`、`isPlainObject`

## 性能监控 - Aegis

1. 需要动态设置用户唯一标识符
2. 查看监控记录需要腾讯云权限

## tdesign 组件库

1. 全局启用 icon、button、navbar 组件
