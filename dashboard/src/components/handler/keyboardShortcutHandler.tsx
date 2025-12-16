"use client";

import { useEffect, useState } from "react";
import { KEYBOARD_SHORTCUTS, matchesShortcut } from "@/lib/keyboardShortcuts";
import { KeyboardShortcutsModal } from "@/components/dashboard/modal/KeyboardShortcutsModal";

export function KeyboardShortcutsHandler() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of KEYBOARD_SHORTCUTS) {
        if (matchesShortcut(event, shortcut.combo)) {
          event.preventDefault();
          if (shortcut.action === "show-shortcuts") {
            setOpen(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <KeyboardShortcutsModal open={open} onOpenChange={setOpen} />;
}
