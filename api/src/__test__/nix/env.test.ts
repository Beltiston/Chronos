import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function cmd(command: string): string {
  return execSync(command, { encoding: "utf8" }).trim();
}

const inNix = Boolean(process.env.IN_NIX_SHELL || process.env.NIX_PROFILES);

describe("API Nix environment", () => {
  it("is executed inside the api workspace", () => {
    expect(existsSync("package.json")).toBe(true);
  });

  (inNix ? it : it.skip)("has the correct Node version", () => {
    const version = cmd("node --version");
    expect(version).toMatch(/^v22\./);
  });

  (inNix ? it : it.skip)("has the correct PNPM version", () => {
    const version = cmd("pnpm --version");
    expect(version).toMatch(/^10\./);
  });

  (inNix ? it : it.skip)("has the correct PYTHON version", () => {
    const version = cmd("python --version");
    expect(version).toMatch(/^Python 3.12\./);
  });

});
