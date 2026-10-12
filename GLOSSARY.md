# Pi Preset 领域模型术语表 (GLOSSARY.md)

本文档定义并统一 `pi-preset` 项目及其周边生态中的核心概念与术语。

## 核心术语

### Pi Package (Pi 软件包)
Pi 官方的一体化扩展与资源分发单元。遵循标准目录规范（`extensions/`, `skills/`, `prompts/`, `themes/`）或在 `package.json` 的 `pi` 字段中显式声明资源路径。支持通过 `npm:`, `git:`, 或本地路径加载。

### Preset (预设)
面向开发者个人或团队的开箱即用工作区环境定义。不仅包含定制的代码开发技能（Skills）与本地扩展，还聚合了推荐的第三方远程包清单（Remote Packages）及环境运行参数。

### Remote Package Link (第三方远程包链接)
在 Pi 体系中声明远程依赖的标准格式。
- `npm:<pkg>@<ver>`: 从 npm 镜像仓库拉取并安装到 Pi 内部沙箱。
- `https://github.com/<owner>/<repo>` 或 `git:...`: 直接克隆并固化在特定 ref 的 git 仓库源码包。

### Built-in Skill (内置技能)
随本预设直接分发的高阶智能体工作流。存放在 `skills/<name>/SKILL.md` 中，包含完整的触发条件（description）、工作流程（procedure）、规则陷阱（pitfalls）与验证标准。

### Built-in Extension (内置扩展)
随本预设分发的 TypeScript 扩展模块（存放于 `extensions/*.ts`）。在 Pi 进程中以原生权限执行，提供系统事件钩子、快捷键行为修正或上下文管理功能。

### Declarative Preset Packaging (声明式预设装配)
基于 `package.json` 的 `dependencies` 与 `pi` 字段映射，由 Pi 原生包管理器实现纯声明式、零脚本的一键全量装配与自动发现。不需要额外的同步命令行脚手架。
