# GitHub 下载加速

基于 [XIU2/UserScript](https://github.com/XIU2/UserScript) 的 `GithubEnhanced-High-Speed-Download.user.js`（GPL-3.0）修改，首次修改日期 2026-10-25。

## 安装

**[点击安装](https://raw.githubusercontent.com/YuKongA/github-download-userscript/main/github-high-speed-download.user.js)**（需 [Tampermonkey](https://www.tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/) / ScriptCat）

安装后通过 `@updateURL` 跟随本仓库更新。

## 功能

- **Release**：每个资产下方 5 个加速按钮
- **Raw**：文件页 3 个加速按钮
- **Code(ZIP)**：仓库首页 Code 下拉框内 3 条 ZIP 加速项
- **Git Clone**：同一下拉框内 3 条整行克隆地址，自带复制按钮
- **☁ 单文件下载**：文件列表悬停显示，可在菜单里切换加速源
- **菜单**：加速源切换、☁ 下载、Git Clone / Download ZIP 开关、自定义加速源

## 与上游的差异

- **Release 布局**：加速按钮独立成行，改用 GitHub 原生按钮与 CSS 变量，自动跟随深色主题
- **Code 下拉框**：整行克隆，不改写原生输入框；新增 Git Clone / Download ZIP 两个独立开关
- **弹窗定位**：注入行会撑高弹窗并被顶到视口顶部，现限高并改为内部滚动
- **元数据**：只保留简体中文 `@name` / `@description`

## 加速源

按实测速度排序，脚本只取前 N 条，其余以注释保留在数组里（取消注释即可启用）。

| 用途                | 启用源                                    |
| ------------------- | ----------------------------------------- |
| Release / Code(ZIP) | `monlor` `xget` `h233` `ghpxy` `gh-proxy` |
| Raw                 | `cdn-proxy` `hk-proxy` `testingcf`        |
| Git Clone           | `monlor` `hk-proxy` `gh-proxy`            |

测试口径：2026-10-25，浙江移动

## 协议与致谢

- 协议：[GPL-3.0](LICENSE)
- 原作者：[X.I.U (XIU2)](https://github.com/XIU2)，加速源列表与核心逻辑来自其脚本
- 本仓库只做新版 GitHub 适配与源列表整理，加速源本身由各公益节点提供
