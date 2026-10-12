---
name: "codebase-reverse-spec"
description: "对存量老代码项目进行逆向工程，扫描代码拓扑、反推业务需求PRD、提炼统一语言CONTEXT.md、固化ADR并拆解.scratch工单。触发词：反推需求、逆向工程、接入AI开发、老项目接入、存量代码规范化、reverse engineer codebase、spec from code。"
version: 1
created: "2026-10-11"
updated: "2026-10-11"
---
## When to Use
当面对缺乏规范文档、缺乏最新PRD或缺少统一语言的存量代码库（Brownfield Codebase），需要将其快速且严谨地接入现代 AI Agent 工程化开发体系时使用。

## Procedure
1. 第一步（拓扑与依赖摸底）：检查包管理器文件（package.json/pubspec.yaml/Cargo.toml等），梳理Workspace拓扑、核心技术选型、路由表及已有文档碎片。
2. 第二步（业务语义与需求反推）：自底向上分析实体模型（Entities/DTOs）与UI视图动线，逆向反推出产品全景能力矩阵，生成 .scratch/<feature>/spec.md 结构化需求文档。
3. 第三步（领域契约与ADR沉淀）：提炼统一领域词汇（Glossary），生成根目录 CONTEXT.md 锁定标准命名；将隐含架构模式固化为 docs/adr/ 架构决策记录；配置 AGENTS.md 约束红线。
4. 第四步（任务工单切分与AI接管）：配置 docs/agents/ 协议映射，扫描代码库中的 TODO/技术债，在 .scratch/<feature>/issues/ 下切分标有 ready-for-agent 的原子工单，打通后续自动化执行。

## Pitfalls
- 严禁在没有反推 CONTEXT.md 领域词汇前直接让 AI 开始写代码，否则容易产生同义词混乱和概念漂移。
- 反推需求时不要只看主链路，务必留意历史边界判断和异常处理逻辑，避免遗漏关键业务规则。
- ADR 必须严格聚焦架构铁律（如UI无边框、无状态原则等），不可写成流水账。

## Verification
1. 检查根目录下是否生成了权威的 CONTEXT.md 领域模型词汇表。
2. 检查 docs/adr/ 下是否记录了核心既有架构设计决策。
3. 检查 .scratch/ 下是否包含完整的 spec.md 与标有 ready-for-agent 的拆解工单。
4. 检查 AGENTS.md 是否正确指向 docs/agents/ 协议。