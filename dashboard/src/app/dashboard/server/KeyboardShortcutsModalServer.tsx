import { KEYBOARD_SHORTCUTS, getAllCategories } from "@/lib/keyboardShortcuts";
import { ShortcutHint } from "@/components/ui/shortcut-hint";

export function KeyboardShortcutsModalServer() {
  const categories = getAllCategories();

  return (
    <div className="max-w-lg">
      {categories.map((category) => (
        <section key={category} className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {category}
          </h3>
          <ul className="space-y-2">
            {KEYBOARD_SHORTCUTS.filter((s) => s.category === category).map((shortcut) => (
              <li key={shortcut.id} className="flex items-center justify-between">
                <span className="text-sm">{shortcut.description}</span>
                <ShortcutHint id={shortcut.id} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}