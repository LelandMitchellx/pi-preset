# ISSUE-0001: 上游 @earendil-works/pi-tui 斜杠命令带空格 Tab 参数补全失效

- **状态**: Workaround Implemented (已通过本地扩展热修)
- **受影响组件**: `@earendil-works/pi-tui` (Pi TUI 核心输入与编辑器组件)
- **热修文件**: `extensions/slash-tab-fix.ts`
- **对应架构决策**: 见 [ADR-0001](../adr/0001-preset-packaging-architecture.md)

---

## 一、现象描述 (Symptom)

在 Pi 交互终端中，输入斜杠命令及其参数时（例如 `/title ` 或 `/fresh -`）：
- 期望行为：按 `Tab` 键应唤出该命令对应的参数或标志自动补全列表。
- 实际行为：命令名称后一旦带有空格，按 `Tab` 键补全列表完全不响应，或被错误路由为文件路径补全。

---

## 二、根因定位 (Root Cause Analysis)

经深入审查宿主 `@earendil-works/pi-tui` 源码输入处理流程，定位到两处底层硬编码逻辑冲突：

1. **`Editor.prototype.handleTabCompletion()` 空格误判**：
   - 源码中硬编码了 `!beforeCursor.trimStart().includes(" ")` 检查；
   - 导致光标前只要包含空格，就被判定为“非命令阶段”，跳过斜杠命令补全，强行委托给 `forceFileAutocomplete(true)`。

2. **`CombinedAutocompleteProvider` 强制标志互斥**：
   - 内部条件逻辑为 `!options.force && commandText.startsWith("/")`；
   - 当外界以 `force: true` 触发补全时，直接跳过了斜杠命令参数补全的判定链路。

---

## 三、热修实现 (Workaround Strategy)

在 `extensions/slash-tab-fix.ts` 中实施双重无缝兜底：

1. **原型层热修**：
   - 拦截并替换 `Editor.prototype.handleTabCompletion`；
   - 判断当前若处于斜杠命令上下文（无论是否有空格），统一委托给 `this.handleSlashCommandCompletion()`。
2. **API 包装兜底**：
   - 通过 `ctx.ui.addAutocompleteProvider` 注册一层幂等包装；
   - 当参数处于斜杠命令阶段且带有 `force: true` 时，纠正为 `force: false`，确保上游参数 Provider 正常被唤起。

---

## 四、安全移除条件 (Removal Criteria)

当上游 `@earendil-works/pi-tui` 官方发版修复了 `Editor.prototype.handleTabCompletion` 中的空格分支逻辑后：
1. 删除 `extensions/slash-tab-fix.ts`；
2. 从 `package.json` 的 `pi.extensions` 中移除该扩展引用；
3. 将本文档状态标记为 `Resolved Upstream`。
