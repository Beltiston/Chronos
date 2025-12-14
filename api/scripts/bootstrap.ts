import fs from "fs";
import path from "path";

// Bootstrap for CSpell
const file = path.resolve(".vscode/cspell/.cspell.config.json");
if (!fs.existsSync(file)) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, "{}\n");
  console.log("Created missing cSpell config:", file);
}
