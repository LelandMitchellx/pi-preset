import type { BeforeAgentStartEvent, ExtensionAPI, ExtensionCommandContext } from '@earendil-works/pi-coding-agent';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Persona Loader Extension
 * 
 * 自动加载并注入预设中的人设指令与交互规范 (APPEND_SYSTEM.md)
 * 使得用户只要安装 pi-preset，即可无感激活人设与 TUI 弹窗交互问答规范。
 */
export default function personaLoaderExtension(pi: ExtensionAPI): void {
  // 定位预设根目录的 APPEND_SYSTEM.md
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const presetAppendPath = join(currentDir, '..', 'APPEND_SYSTEM.md');

  // 内存缓存静态人设内容，避免每轮会话阻塞式读盘
  let cachedPersona: string | null = null;
  function getPersonaText(): string {
    if (cachedPersona !== null) return cachedPersona;
    if (existsSync(presetAppendPath)) {
      try {
        cachedPersona = readFileSync(presetAppendPath, 'utf-8').trim();
      } catch {
        cachedPersona = '';
      }
    } else {
      cachedPersona = '';
    }
    return cachedPersona;
  }

  // 注册 /persona 状态查看命令
  pi.registerCommand('persona', {
    description: '查看当前预设激活的人设与行为规范状态',
    handler: async (_args: string, ctx: ExtensionCommandContext) => {
      const text = getPersonaText();
      if (!text) {
        ctx.ui.notify('未找到预设 APPEND_SYSTEM.md 人设文件', 'warning');
        return;
      }
      ctx.ui.notify('🐋 预设人设模块运行中 (鲸鱼娘 / TUI 交互式问答)', 'info');
    }
  });

  // 在 Agent 启动前动态注入到系统提示词
  pi.on('before_agent_start', (event: BeforeAgentStartEvent) => {
    const personaText = getPersonaText();
    if (!personaText) return;

    // 检查当前系统提示词中是否已存在该人设（防止全局已配置时重复注入）
    const currentFullPrompt = event.systemPrompt || '';
    const currentAppend = event.systemPromptOptions?.appendSystemPrompt || '';

    if (
      !currentFullPrompt.includes('[PERSONA_LOAD]') &&
      !currentAppend.includes('[PERSONA_LOAD]')
    ) {
      if (event.systemPromptOptions) {
        event.systemPromptOptions.appendSystemPrompt = currentAppend
          ? `${currentAppend}\n\n${personaText}`
          : personaText;
      } else {
        return {
          systemPrompt: `${currentFullPrompt}\n\n${personaText}`
        };
      }
    }
  });
}
