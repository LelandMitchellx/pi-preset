# WSL 现代 AI 编程全栈架构与实战知识指南

> 本文档系统梳理了以 **WSL (Linux 原生基建)** 为底座、以 **Pi (Agent Harness)** 为智能中枢的下一代 AI 辅助软件工程体系，并全量对齐当前环境装配的远程扩展依赖、核心本地技能与外部 MCP 编译器直连。

---

## 目录
1. [一、底层基建层 (WSL & Toolchains)](#一底层基建层-wsl--toolchains)
2. [二、智能中枢：Pi 核心架构拆解 (按权重排序)](#二智能中枢pi-核心架构拆解-按权重排序)
   - [2.1 LLM (大模型矩阵：智能源泉与核心大脑)](#21-llm-大模型矩阵智能源泉与核心大脑)
   - [2.2 Context (上下文工程：思考桌面与压缩哲学)](#22-context-上下文工程思考桌面与压缩哲学)
   - [2.3 Skill (规范库：专家思维 SOP 与架构准则)](#23-skill-规范库专家思维-sop-与架构准则)
   - [2.4 Subagent & Engine (多智能体协同、引擎与代码透镜)](#24-subagent--engine-多智能体协同引擎与代码透镜)
   - [2.5 MCP (跨系统协议：真实工具链的 Type-C 数据线)](#25-mcp-跨系统协议真实工具链的-type-c-数据线)
   - [2.6 Memory (分层记忆：跨会话知识档案与检索中心)](#26-memory-分层记忆跨会话知识档案与检索中心)
   - [2.7 Extension (扩展系统：宿主外设插件与生命周期增强)](#27-extension-扩展系统宿主外设插件与生命周期增强)
   - [2.8 TUI (终端交互界面：人类驾驶舱与可视化反馈)](#28-tui-终端交互界面人类驾驶舱与可视化反馈)
3. [三、实战协作流水线 (从需求到交付)](#三实战协作流水线-从需求到交付)
4. [四、当前环境扩展体系全量归类矩阵 (Current Installed Stack)](#四当前环境扩展体系全量归类矩阵-current-installed-stack)
5. [五、预设一键装配与维护指南 (Pi Preset Integration)](#五预设一键装配与维护指南-pi-preset-integration)

---

## 一、底层基建层 (WSL & Toolchains)

在 Windows 上进行现代化全栈与 AI 辅助开发，**WSL2 (Windows Subsystem for Linux)** 提供了接近原生的 Linux 内核环境，消除了跨平台路径、符号链接与 Shell 脚本兼容性阻碍。

* **Git**：版本控制基石。配合 Git Worktree 支持多分支物理隔离并发，为 Agent 隔离编码提供土壤。
* **Node / Bun / Deno**：现代 JavaScript/TypeScript 运行时。Bun 提供了亚毫秒级的启动速度；Node 保障了生态最广的 npm 工具兼容。
* **Flutter / Dart**：跨平台 UI 框架。结合 `dart-mcp-server`，允许 AI 直接挂载编译器进行 AST 分析与诊断。
* **Rust**：高性能系统级与底层扩展语言，为高吞吐分析工具（如 ripgrep, ast-grep）提供算力支撑。

---

## 二、智能中枢：Pi 核心架构拆解 (按权重排序)

整个架构按照**「思考大脑 ➔ 思考桌面 ➔ 思维规程 ➔ 舰队与引擎 ➔ 工具外接 ➔ 知识沉淀 ➔ 宿主扩展 ➔ 界面交互」**从核心到外围逐级展开：

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          Pi (Agent Harness)                            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. LLM (思考大脑与多模型适配)      ➔ 2. Context (思考桌面与分级压缩)     │
│ 3. Skill (专家思维 SOP 与规程)      ➔ 4. Subagent & Engine (舰队与代码透镜) │
│ 5. MCP (编译器/LSP 直连数据线)      ➔ 6. Memory (分层持久档案与知识召回)   │
│ 7. Extension (宿主外设与功能扩展)   ➔ 8. TUI (人类终端驾驶舱与感官呈现)    │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 LLM (大模型矩阵：智能源泉与核心大脑)
* **重要性权重**：★★★★★（第 1 位：系统智慧之源）
* **本质定位**：坐在办公工位上的核心员工大脑。没有高智商的大模型，后续一切工具和规范都是空谈。
* **模型分工策略**：
  * **Gemini (Flash / Pro)**：超大上下文窗口、极高性价比，适合全库检索、超长日志剖析与快速初审；
  * **Claude (Sonnet / Opus)**：顶尖的代码逻辑推理与重构能力，适合复杂架构设计与深层缺陷诊断；
  * **ChatGPT / GPT-4o**：极稳健的综合指令遵循，适合多语言综合任务；
  * **DeepSeek / Grok**：极具性价比的代码生成与逻辑推理底座。
* **配套扩展**：`pi-magpie` 充当统一多模型路由层，无缝接入第三方 API 聚合分发网关。

### 2.2 Context (上下文工程：思考桌面与压缩哲学)
* **重要性权重**：★★★★★（第 2 位：决定大脑思考上限的物理空间）
* **本质痛点**：上下文窗口（Context Window）是大模型的“工作桌面”。信息过载会导致注意力稀释（Needle-in-a-Haystack 效应），AI 会遗忘关键目标或产生幻觉。
* **压缩哲学**：
  * **提取事实，丢弃皮囊**：保留确定的技术参数、文件路径、接口签名和决策原因，丢弃冗长的构建日志与重复翻看文件的中间过程；
  * **分级归档**：使用 `billion-context` 将已完成讨论分块打包为历史摘要，随时支持逆向解压缩（Decompress）；
  * **视界监控**：通过 `pi-context-view` 实时感知当前上下文填充率与关键 token 分布。

### 2.3 Skill (规范库：专家思维 SOP 与架构准则)
* **重要性权重**：★★★★☆（第 3 位：约束 AI 不乱写代码的行为法则）
* **本质定位**：AI 员工手边的《岗位标准化操作手册》，将资深工程师的思维路径固化为标准规程（统一使用单数规范）。
* **核心规程库**：
  * **Matt Pocock 架构库 (`mattpocock/skills`)**：
    * `/to-spec`：从对话中提炼出 Problem Statement、Solution、Seams 与 Out of Scope，产出标准 Spec 文档；
    * `/to-tickets`：将 Spec 垂直切片为相互阻塞依赖的细粒度工单（Tracer-bullet Tickets）；
    * `/tdd`：测试驱动开发，红-绿-重构循环；
    * `/code-review`：多维度代码质量审查与标准对齐。
  * **极简编码规程 (`ponytail`)**：Senior Dev 极简视角，推崇 YAGNI 原则，坚决剪除无用抽象与过度设计。
  * **内置工程技能**：涵盖存量代码逆向分析（`codebase-reverse-spec`）、原子 Git 提交（`git-commit`）与技术调研（`tech-investigate`）。

### 2.4 Subagent & Engine (多智能体协同、引擎与代码透镜)
* **重要性权重**：★★★★☆（第 4 位：解决任务并发、上下文隔离与代码落地的工业级底座）
* **层次关系解析**：
  * **Subagent 是「台前演员 / 业务角色」**：开辟隔离上下文沙盒执行并行调研或测试，查完资料只带结论汇报，保护主桌面不被中间过程塞爆；
  * **Fabric 是「幕后舞台机械 / 分布式引擎」**：为 Subagent 舰队提供动力的轻量 Actor 运行时与 TypeScript 代码沙盒（Codemode），免去反复敲单步 Shell 命令的开销；
  * **代码透镜与知识图谱**：
    * `pi-lens`：基于 ast-grep 与 Tree-Sitter，提供语义级代码模式定位、LSP 引用跳转与安全模式替换；
    * `@patimweb/pi-mindplace`：零 LLM 消耗秒级构建本地 AST 拓扑图谱，优先查询调用链与文件依赖，大幅节省上下文；
    * `archify`：直接生成高保真交互式架构图、时序图与状态机可视化页面。

### 2.5 MCP (跨系统协议：真实工具链的 Type-C 数据线)
* **重要性权重**：★★★★☆（第 5 位：赋予 AI 真实世界专业工具操纵权）
* **本质定位**：AI 接入外部专业开发环境（IDE/Compiler/LSP）的跨进程标准协议。
* **工作机制**：
  * 模型不再靠“肉眼瞎猜”，而是通过 JSON-RPC 协议直接调用底层真实编译器分析器；
  * 例如 `dart-mcp-server`：直连 Dart 分析器执行语法诊断、运行时错误捕获与符号定义查询。

### 2.6 Memory (分层记忆：跨会话知识档案与检索中心)
* **重要性权重**：★★★☆☆（第 6 位：让 AI 拥有跨越时间与项目的成长积累）
* **本质定位**：跨会话、跨生命周期的公司级档案库与检索中枢。
* **分层作用域 (以 `pi-hermes-memory` 为例)**：
  * **User Memory**：跨项目全局生效，记录主人的工作习惯与核心偏好；
  * **Project Memory**：项目专属，记录当前仓库的特定约定（如无边框 Bento-box 设计、规范定义）；
  * **Failure Memory**：记录历史踩坑与报错教训，防止 AI 在同一个坑里跌倒两次；
  * **自带检索 (FTS5 + 向量 RAG)**：基于 SQLite 全文搜索与向量检索，自动在对话中召回匹配的历史知识与工程约束。

### 2.7 Extension (扩展系统：宿主外设插件与生命周期增强)
* **重要性权重**：★★★☆☆（第 7 位：赋能 Pi 客户端自身能力的物理外挂）
* **本质定位**：直接运行在 Pi 宿主 Node/TS 进程中的物理外挂插件，扩展宿主自身的交互、命令与功能边界。
* **实战装配案例**：
  * `pi-rewind`：提供 Git 自动快照、后悔药时光机与 `Esc+Esc` 闪电回滚；
  * `pi-goal-x`：提供目标驱动任务状态机，自动拆解并持续追踪长流程任务进度；
  * `@juicesharp/rpiv-ask-user-question`：提供结构化 TUI 弹窗交互问答与多选项确认；
  * `@juicesharp/rpiv-btw`：在不打断当前主任务的前提下，发起平行侧枝对话；

### 2.8 TUI (终端交互界面：人类驾驶舱与可视化反馈)
* **重要性权重**：★★☆☆☆（第 8 位：人类感知与操控系统的终点）
* **本质定位**：Agent 的“物理面容与驾驶舱”。
* **实战装配案例**：
  * `pi-open-tui`：极简排版与实时性能遥测仪表盘（TPS、首字延迟 TTFT、费用与 Token 速率）；
    * `pi-title`：根据会话交流内容自动智能命名终端会话窗口标题；
  * `awesome-pi-themes`：精选终端色彩主题包（如当前运行的 `codex-slate` 等）。

---

## 三、实战协作流水线 (从需求到交付)

在本项目与 WSL 中，一套高质量的 AI 研发标准流动如下：

```mermaid
graph TD
    A[1. 讨论原始需求] --> B[2. Matt 规范入库: to-spec]
    B --> C[3. 生成 .scratch/feature/spec.md]
    C --> D[4. 切割垂直工单: to-tickets]
    D --> E[5. Subagent 舰队并发推进 (Fabric TS Codemode)]
    E --> F[6. 调用 MCP 编译器校验与分析 (dart-mcp-server)]
    F --> G[7. pi-rewind 自动快照兜底与 Esc+Esc 回滚]
    G --> H[8. 最终 Review 并沉淀至 Memory (pi-hermes-memory)]
```

---

## 四、当前环境扩展体系全量归类矩阵 (Current Installed Stack)

根据上述八大工程领域，当前环境装配的 **自研内置扩展 + 托管远程扩展依赖 + 本地核心技能 + 外部 MCP 编译器服务** 完整清单与注释如下：

| 领域分类 | 来源与包标识 | 类型 | 核心工具 / 指令 | 详细注释与实战作用 |
| :--- | :--- | :---: | :--- | :--- |
| **2.1 LLM** (模型矩阵与路由) | `git:LelandMitchellx/pi-magpie` | 远程 Git | `/provider magpie` | **多模型路由统一适配器**：聚合主流与第三方模型 API，支持灵活切换推理底座。 |
| **2.2 Context** (上下文工程与压缩) | `npm:billion-context` | 远程 npm | `compress`, `decompress`, `search_context` | **长会话无损分级压缩**：提取事实丢弃皮囊，解决注意力稀释，支持按需逆向还原。 |
| | `npm:pi-context-view` | 远程 npm | `/context-view` | **思考桌面视界透镜**：实时直观查看当前会话 Token 占用率与内容结构占比。 |
| **2.3 Skill** (专家思维 SOP 规程) | `git:mattpocock/skills` | 远程 Git | `to-spec`, `to-tickets`, `tdd`, `code-review` | **行业标杆工程思维库**：Matt Pocock 架构规程，严格拆解工单、红绿重构与双轴代码审查。 |
| | `npm:@dietrichgebert/ponytail` | 远程 npm | `/ponytail`, `ponytail-audit` | **反过度工程 (YAGNI) 审计**：资深工程师极简视角，裁撤冗余胶水层与伪抽象。 |
| | `./APPEND_SYSTEM.md` | 本地内置 | 系统追加指令 | **人设与交互式问答规程**：固化傲娇聪明鲸鱼娘人设，并强制绑定 TUI 结构化弹窗问答规范。 |
| | `./skills/codebase-reverse-spec` | 本地内置 | `codebase-reverse-spec` | **存量老项目逆向工程**：扫描代码拓扑、反推业务 PRD、提炼统一语言并切分工单。 |
| | `./skills/git-commit` | 本地内置 | `git-commit` | **规范化原子提交**：全自动安全扫描变更、多模块交互确认并生成标准 Commit 规范。 |
| | `./skills/tech-investigate` | 本地内置 | `tech-investigate` | **技术极速调研**：拆解第三方库或概念的“核心价值”与“如何使用”，拒绝空谈。 |
| **2.4 Subagent & Engine** (执行引擎与代码透镜) | `npm:pi-fabric` | 远程 npm | `fabric_exec`, `workflow` | **分布式执行引擎与 TS 沙盒**：提供强类型 TS Codemode、Actor 模型与 Swarm 舰队调度。 |
| | `npm:pi-lens` | 远程 npm | `pi-lens-lsp-navigation`, `ast-grep` | **高精度语义代码透镜**：Tree-Sitter / ast-grep 精准模式匹配，结合 LSP 语法树导航。 |
| | `npm:@patimweb/pi-mindplace` | 远程 npm | `mindplace_build`, `mindplace_query` | **零 LLM 开销代码知识图谱**：本地秒级构建代码调用关系网，替代低效 raw file 扫描。 |
| | `git:tt-a1i/archify` | 远程 Git | `archify`, `archify-review` | **交互式架构与流程图生成**：一键生成带光流追踪与暗黑模式的高保真 HTML/SVG 架构图。 |
| **2.5 MCP** (编译器/LSP 直连总线) | `dart-mcp-server` | 外部 MCP | `analyze_files`, `lsp`, `vm_service` | **Dart/Flutter 官方分析总线**：直连真实编译器，实现精准语法诊断与运行时报错捕获。 |
| **2.6 Memory** (分层记忆与知识召回) | `npm:pi-hermes-memory` | 远程 npm | `memory_search`, `memory_add`, `skill_manage` | **分层记忆保险柜与 RAG**：SQLite FTS5 + 向量检索，隔离用户习惯、项目约定与踩坑记录。 |
| **2.7 Extension** (宿主外设与功能增强) | `./extensions/persona-loader.ts` | 本地内置 | `/persona` | **人设自动加载器**：通过生命周期钩子将预设人设无感注入系统提示词，跨机器免配置。 |
| | `./extensions/fresh-session.ts` | 本地内置 | `/fresh`, `/ft`, `/ff` | **极速会话生命周期管理**：支持秒级重置持久会话，或开启不落盘的临时纯内存会话。 |
| | `./extensions/slash-tab-fix.ts` | 本地内置 | `-底层补丁-` | **斜杠命令 Tab 参数补全热修复**：解决 Pi 原生在命令带空格时按 Tab 补全失效的底层 Bug。 |
| | `npm:pi-rewind` | 远程 npm | `/rewind`, `Esc+Esc` | **自动快照与后悔药时光机**：文件修改自动打 Checkpoint，支持随时秒级安全倒流回滚。 |
| | `npm:pi-goal-x` | 远程 npm | `create_goal`, `update_goal` | **目标驱动长任务追踪器**：拆解大任务为原子阶段状态机，防止长会话目标漂移。 |
| | `npm:@juicesharp/rpiv-ask-user-question` | 远程 npm | `ask_user_question` | **交互式 TUI 结构化弹窗**：在需要决策确认时弹出单选/多选题，避免冗长纯文本问答。 |
| | `npm:@juicesharp/rpiv-btw` | 远程 npm | `/btw` | **侧枝无干扰平行思考流**：在主任务推进同时发起无上下文污染的平行旁支提问。 |
| **2.8 TUI** (终端驾驶舱与感官呈现) | `npm:pi-open-tui` | 远程 npm | `/tui` | **OpenTUI 终端驾驶舱与性能遥测**：优雅布局，实时监控 TPS、TTFT 延迟与 Token 账单。 |
| | `npm:pi-title` | 远程 npm | `pi-title` | **智能窗口标题跟随**：根据对话内容自动提炼并设置当前终端窗口/Tab 标题。 |
| | `npm:awesome-pi-themes` | 远程 npm | `/theme <name>` | **精选色彩主题库**：提供包含 `codex-slate`、`nord` 等在内的多套专业终端视觉主题。 |

---

## 五、预设一键装配与维护指南 (Pi Preset Integration)

为了避免在每台机器或每个 WSL 实例上逐个手动安装各类扩展，本项目已封装为 **`pi-preset`** 原生预设包：

```bash
# 1. 进入预设目录并安装依赖
cd ~/Code/pi-preset
npm install

# 2. 将整个预设包一次性注册到 Pi
pi install .
```

* **极致体验**：由于 `package.json` 的 `dependencies` 已全量收录扩展依赖，Pi 加载 `pi-preset` 即等同于激活全部第三方扩展与本地技能。
* **统一升级**：后续如需升级某个扩展，仅需在 `pi-preset/package.json` 中调整版本号或运行 `npm update`，无需维护冗长的全局 `settings.json`！
