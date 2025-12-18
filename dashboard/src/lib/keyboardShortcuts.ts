/**
 * Centralized keyboard shortcuts configuration
 */

export type ShortcutId =
  | "search"
  | "help"
  | "dashboard"
  | "projects"
  | "settings";

export interface KeyboardShortcut {
  id: ShortcutId;
  keys: string[];
  combo: {
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    key: string;
  };
  description: string;
  category: "Navigation" | "Search" | "Actions" | "Help";
  action?: string;
}

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    id: "search",
    keys: ["Ctrl", "K"],
    combo: { ctrl: true, key: "k" },
    description: "Focus search bar",
    category: "Search",
    action: "focus-search",
  },
  {
    id: "help",
    keys: ["F1"],
    combo: { key: "F1" },
    description: "Show keyboard shortcuts",
    category: "Help",
    action: "show-shortcuts",
  },
  {
    id: "dashboard",
    keys: ["G", "D"],
    combo: { key: "d" }, // Simplified for search, might need 'g' then 'd' sequence logic later
    description: "Go to Dashboard",
    category: "Navigation",
  },
];

export const SHORTCUT_MAP: Record<ShortcutId, KeyboardShortcut> =
  KEYBOARD_SHORTCUTS.reduce((acc, shortcut) => {
    acc[shortcut.id] = shortcut;
    return acc;
  }, {} as Record<ShortcutId, KeyboardShortcut>);

/**
 * Matches a keyboard event against a shortcut combo
 */
export function matchesShortcut(
  event: KeyboardEvent,
  combo: KeyboardShortcut["combo"]
): boolean {
  const isCtrl = !!combo.ctrl === (event.ctrlKey || event.metaKey);
  const isShift = !!combo.shift === event.shiftKey;
  const isAlt = !!combo.alt === event.altKey;
  const isKey = event.key.toLowerCase() === combo.key.toLowerCase();

  return isCtrl && isShift && isAlt && isKey;
}

/**
 * Get display keys for a shortcut
 */
export function getShortcutDisplayKeys(shortcut: KeyboardShortcut): string[] {
  return shortcut.keys;
}

/**
 * Format keys for display as objects with isLast flag
 */
export function formatShortcutKeys(
  keys: string[]
): { key: string; isLast: boolean }[] {
  return keys.map((key, index) => ({
    key,
    isLast: index === keys.length - 1,
  }));
}

export function getAllCategories(): KeyboardShortcut["category"][] {
  const categories = new Set(KEYBOARD_SHORTCUTS.map((s) => s.category));
  return Array.from(categories);
}

export function getShortcutsByCategory(category: string): KeyboardShortcut[] {
  return KEYBOARD_SHORTCUTS.filter((s) => s.category === category);
}
