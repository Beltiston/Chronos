import { Kbd } from "@/components/ui/kbd";
import { formatShortcutKeys, SHORTCUT_MAP, ShortcutId } from "@/lib/keyboardShortcuts";
import { getShortcutDisplayKeys } from "@/lib/keyboardShortcuts";

export function ShortcutHint({
  id
}: { id: ShortcutId }) {
  const shortcut = SHORTCUT_MAP[id];
  if (!shortcut) return null;

  const keys = getShortcutDisplayKeys(shortcut);

  return (
    <div className="flex items-center gap-1">
      {formatShortcutKeys(keys).map(({ key, isLast}) => (
        <span key={key} className="flex items-center gap-1">
          <Kbd>{key}</Kbd>
          {!isLast && <span>+</span>}
        </span>
      ))}
    </div>
  );
}
