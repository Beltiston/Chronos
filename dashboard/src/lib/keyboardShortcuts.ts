"use client";
/**
 * Centralized keyboard shortcuts configuration
 * This file serves as the single source of truth for all keyboard shortcuts in the application
 */

export interface KeyboardShortcut {
  id: string;
  combo?: {
    mod?: boolean; // Ctrl on Win/Linux, Cmd on macOS
    shift?: boolean;
    alt?: boolean;
    key: string;
  };
  keys: {
    mac?: string[];
    linux: string[]; // Also used as fallback for other platforms.
    windows?: string[];
  };
  description: string;
  category: "Navigation" | "Search" | "Actions" | "Help";
  action?: string;
}

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    id: "search",
    combo: { mod: true, key: "k" },
    keys: {
      linux: ["Ctrl", "K"],
      mac: ["Cmd", "K"],
    },
    description: "Focus search bar",
    category: "Search",
    action: "focus-search",
  },
  {
    id: "help",
    combo: { key: "f1" },
    keys: {
      linux: ["F1"],
    },
    description: "Show keyboard shortcuts",
    category: "Help",
    action: "show-shortcuts",
  },
];

export type ShortcutId = (typeof KEYBOARD_SHORTCUTS)[number]["id"];

export const SHORTCUT_MAP: Record<ShortcutId, KeyboardShortcut> =
  Object.fromEntries(KEYBOARD_SHORTCUTS.map((s) => [s.id, s])) as Record<
    ShortcutId,
    KeyboardShortcut
  >;

/**
 * Format keyboard shortcut keys for display
 * @param keys - Array of key names
 * @returns Formatted string for display
 */
export function formatShortcutKeys(
  keys: string[]
): { key: string; isLast: boolean }[] {
  return keys.map((key, i) => ({
    key,
    isLast: i === keys.length - 1,
  }));
}

/**
 * Get shortcuts by category
 * @param category - Category to filter by
 * @returns Array of shortcuts in the specified category
 */
export function getShortcutsByCategory(
  category: KeyboardShortcut["category"]
): KeyboardShortcut[] {
  return KEYBOARD_SHORTCUTS.filter(
    (shortcut) => shortcut.category === category
  );
}

/**
 * Get all unique categories
 * @returns Array of all categories
 */
export function getAllCategories(): KeyboardShortcut["category"][] {
  const categories = new Set(KEYBOARD_SHORTCUTS.map((s) => s.category));
  return Array.from(categories);
}

export function matchesShortcut(
  event: KeyboardEvent,
  combo: KeyboardShortcut["combo"]
) {
  if (!combo) return false;

  const keyMatch = event.key.toLowerCase() === combo.key;

  const modMatch = combo.mod ? event.ctrlKey || event.metaKey : true;

  return (
    keyMatch &&
    modMatch &&
    !!combo.shift === event.shiftKey &&
    !!combo.alt === event.altKey
  );
}

export function getShortcutDisplayKeys(shortcut: KeyboardShortcut): string[] {
  if (typeof window === "undefined") {
    return shortcut.keys.linux;
  }

  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);

  if (isMac && shortcut.keys.mac) {
    return shortcut.keys.mac.map((k) => (k === "Cmd" ? "⌘" : k));
  }

  if (!isMac && shortcut.keys.windows) {
    return shortcut.keys.windows;
  }

  return shortcut.keys.linux;
}
