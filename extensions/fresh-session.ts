import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

interface FreshOptions {
  isTemp: boolean;    // 是否为临时内存会话 (等同于 pi --no-session)
  isForce: boolean;   // 是否跳过确认弹窗
  deleteOld: boolean; // 是否删除旧会话文件
}

/**
 * 将底层 SessionManager 篡改为纯内存会话（退出不落盘）
 */
async function makeSessionInMemory(sm: any) {
  sm.persist = false;
  if (sm.sessionFile) {
    const file = sm.sessionFile;
    sm.sessionFile = undefined;
    if (existsSync(file)) {
      try {
        await unlink(file);
      } catch (err: any) {
        console.warn('[fresh-session] unlink session file non-fatal error:', err?.message || err);
      }
    }
  }
}

export default function (pi: ExtensionAPI) {
  /**
   * 核心基座：统一处理所有 fresh 变体逻辑
   */
  async function executeFresh(
    rawArgs: string,
    ctx: ExtensionCommandContext,
    defaultOpts: Partial<FreshOptions> = {}
  ) {
    const args = rawArgs.trim();

    // 参数解析：使用健壮的空白边界正则，彻底消除控制字符隐患
    const hasTempFlag = /(?:^|\s)(-t|--temp|--no-session|-n)(?:\s|$)/i.test(args);
    const hasForceFlag = /(?:^|\s)(-f|--force|-y|--yes)(?:\s|$)/i.test(args);
    const hasKeepFlag = /(?:^|\s)(-k|--keep)(?:\s|$)/i.test(args);
    const hasDeleteFlag = /(?:^|\s)(-d|--delete|--del)(?:\s|$)/i.test(args);

    const isTemp = defaultOpts.isTemp ?? hasTempFlag;
    const isForce = defaultOpts.isForce ?? hasForceFlag;

    // 默认删除策略：
    // - 临时会话模式下：默认保留旧会话（更安全），除非显式指定了 -d / --delete 或 defaultOpts 指定
    // - 普通新建模式下：默认删除旧会话（fresh 的核心语义），除非显式指定了 -k / --keep
    let deleteOld = defaultOpts.deleteOld ?? (isTemp ? hasDeleteFlag : !hasKeepFlag);
    if (hasKeepFlag) deleteOld = false;
    if (hasDeleteFlag) deleteOld = true;

    const oldSessionFile = ctx.sessionManager.getSessionFile();

    // 只有在需要删除实际存在的旧文件、且未开启强制模式时，才弹窗确认
    if (!isForce && deleteOld && oldSessionFile) {
      const modeText = isTemp ? "全新临时会话（内存模式，不保存）" : "全新持久会话";
      const confirmed = await ctx.ui.confirm(
        `Fresh: 重置并开启${modeText}`,
        `即将彻底删除当前旧会话文件：\n${oldSessionFile}\n并开启${modeText}，确定继续吗？`
      );
      if (!confirmed) {
        ctx.ui.notify("已取消操作", "info");
        return;
      }
    }

    const result = await ctx.newSession({
      setup: isTemp ? async (sm) => await makeSessionInMemory(sm) : undefined,
      withSession: async (newCtx) => {
        // 如果需要删除旧文件
        if (deleteOld && oldSessionFile && existsSync(oldSessionFile)) {
          try {
            await unlink(oldSessionFile);
          } catch (err: any) {
            newCtx.ui.notify(
              `已切换会话，但删除旧文件失败: ${err?.message || String(err)}`,
              "warning"
            );
          }
        }

        // 结果反馈
        if (isTemp) {
          const detail = deleteOld
            ? "旧会话已彻底删除，已进入临时会话（不保存到磁盘）"
            : "旧会话已安全保留，已进入临时会话（不保存到磁盘）";
          newCtx.ui.notify(detail, "info");
        } else {
          const detail = deleteOld
            ? "旧会话已删除，已开启全新会话！"
            : "旧会话已保留，已开启全新会话！";
          newCtx.ui.notify(detail, "info");
        }
      },
    });

    if (result.cancelled) {
      ctx.ui.notify("创建会话已取消", "warning");
    }
  }

  // 参数补全提示
  const getCompletions = (prefix: string): AutocompleteItem[] => {
    const items: AutocompleteItem[] = [
      { value: "-t", label: "-t", description: "开启临时内存会话 (等同于 pi --no-session，退出不保存)" },
      { value: "--temp", label: "--temp", description: "开启临时内存会话 (等同于 pi --no-session，退出不保存)" },
      { value: "-f", label: "-f", description: "跳过确认提示，强制秒开" },
      { value: "--force", label: "--force", description: "跳过确认提示，强制秒开" },
      { value: "-k", label: "-k", description: "保留当前会话文件不删除" },
      { value: "--keep", label: "--keep", description: "保留当前会话文件不删除" },
      { value: "-d", label: "-d", description: "彻底删除旧会话文件" },
    ];
    return items.filter((item) => item.value.startsWith(prefix));
  };

  // ==============================
  // 1. 基座主命令
  // ==============================
  pi.registerCommand("fresh", {
    description: "重置会话基座命令：支持删除/保留旧会话，或加 -t 开启临时会话",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx),
  });

  // ==============================
  // 2. 缩写扩展家族
  // ==============================

  // /f -> fresh 原样快捷透传
  pi.registerCommand("f", {
    description: "fresh 快捷缩写 (支持 -t 临时会话 / -f 强制免确认 / -k 保留旧文件)",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx),
  });

  // /ff -> fresh force (免确认删除旧会话，开全新持久会话)
  pi.registerCommand("ff", {
    description: "强制重置：免确认删除旧会话并开启全新会话 (fresh -f)",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx, { isForce: true, deleteOld: true }),
  });

  // /ft -> fresh temp (安全免确认，开启临时会话，旧会话安全保留)
  pi.registerCommand("ft", {
    description: "临时会话：开启不落盘的临时会话 (fresh -t，旧会话安全保留)",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx, { isTemp: true, deleteOld: false, isForce: true }),
  });

  // /fft -> fresh force temp (删除旧会话并开启临时会话，免确认)
  pi.registerCommand("fft", {
    description: "强制临时会话：免确认删除旧会话并开启临时会话 (fresh -f -t)",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx, { isTemp: true, deleteOld: true, isForce: true }),
  });

  // /pit -> 兼容主人习惯的临时会话别名，直通 /ft
  pi.registerCommand("pit", {
    description: "临时会话快捷别名 (等同于 /ft 或 pi --no-session)",
    getArgumentCompletions: getCompletions,
    handler: (args, ctx) => executeFresh(args, ctx, { isTemp: true, deleteOld: false, isForce: true }),
  });
}
