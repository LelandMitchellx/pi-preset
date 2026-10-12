import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Editor } from "@earendil-works/pi-tui";

let isProviderHooked = false;

export default function (pi: ExtensionAPI): void {
  try {
    const proto = (Editor as any)?.prototype;
    if (proto && typeof proto.handleTabCompletion === "function" && !proto.__slashTabFixApplied) {
      proto.__slashTabFixApplied = true;
      const originalHandleTabCompletion = proto.handleTabCompletion;

      proto.handleTabCompletion = function () {
        if (!this.autocompleteProvider) return;
        const currentLine = this.state.lines[this.state.cursorLine] || "";
        const beforeCursor = currentLine.slice(0, this.state.cursorCol);

        if (this.isInSlashCommandContext(beforeCursor)) {
          this.handleSlashCommandCompletion();
        } else {
          originalHandleTabCompletion.call(this);
        }
      };
    }
  } catch (err) {
    console.error("[slash-tab-fix] Failed to patch Editor prototype:", err);
  }

  pi.on("session_start", async (_event: any, ctx: any) => {
    if (isProviderHooked) return;
    isProviderHooked = true;

    ctx.ui.addAutocompleteProvider((current: any) => ({
      ...current,
      async getSuggestions(lines: string[], cursorLine: number, cursorCol: number, options: any) {
        const currentLine = lines[cursorLine] || "";
        const textBeforeCursor = currentLine.slice(0, cursorCol);
        const trimmed = textBeforeCursor.trimStart();

        if (options.force && trimmed.startsWith("/") && trimmed.includes(" ")) {
          return current.getSuggestions(lines, cursorLine, cursorCol, {
            ...options,
            force: false,
          });
        }

        return current.getSuggestions(lines, cursorLine, cursorCol, options);
      },
      applyCompletion: current.applyCompletion.bind(current),
      shouldTriggerFileCompletion: current.shouldTriggerFileCompletion?.bind(current),
    }));
  });
}
