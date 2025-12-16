"use client";

import { KeyboardShortcutsModalServer } from "@/app/dashboard/server/KeyboardShortcutsModalServer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function KeyboardShortcutsModal({ open, onOpenChange }: {open: boolean; onOpenChange: (open: boolean) => void}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to navigate and interact faster.
          </DialogDescription>
        </DialogHeader>

        <KeyboardShortcutsModalServer />
      </DialogContent>
    </Dialog>
  );
}