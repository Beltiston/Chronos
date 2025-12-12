import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { env } from "../src/utils/env"

// ----------------------
// Configuration
// ----------------------
const DATABASE_ENTRY = env.DATABASE_ENTRY!;
const MIGRATION_TYPE = getDatabaseType(DATABASE_ENTRY);
const dbPath = MIGRATION_TYPE === "sqlite" ? getSQLitePath(DATABASE_ENTRY) : DATABASE_ENTRY;
const migrationsDir = path.resolve("db", "migrations", MIGRATION_TYPE);
const db = new Database(dbPath);

// ----------------------
// Ensure migrations table exists
// ----------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS Migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT UNIQUE,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ----------------------
// Helpers
// ----------------------
function getAppliedMigrations(): Set<string> {
  const rows = db.prepare("SELECT filename FROM Migrations").all() as { filename: string }[];
  return new Set(rows.map(r => r.filename));
}

function runMigration(file: string) {
  const fullPath = path.join(migrationsDir, file);
  const sql = fs.readFileSync(fullPath, "utf8");
  console.log(`\n📦 Applying migration: ${file}`);

  try {
    db.exec(sql);
    db.prepare("INSERT INTO Migrations (filename) VALUES (?)").run(file);
    console.log(`✅ Migration applied: ${file}`);
  } catch (err) {
    console.error(`❌ Migration failed: ${file}`, err);
    throw err;
  }
}

function getDatabaseType(entry: string): "sqlite" | "postgres" {
  if (!entry) throw new Error("DATABASE_ENTRY is not defined");

  if (entry.startsWith("postgres://") || entry.startsWith("postgresql://")) {
    return "postgres";
  }

  return "sqlite";
}

function getSQLitePath(entry: string): string {
  if (entry.startsWith("file://")) {
    return entry.replace(/^file:\/\//, "");
  }

  if (entry.startsWith("/")) {
    return path.resolve(process.cwd(), entry.slice(1));
  }

  return path.resolve(process.cwd(), entry);
}

// ----------------------
// Commands
// ----------------------
function createDB() {
  const first = "001_Create_Database.sql";
  runMigration(first);
}

function migrate() {
  const applied = getAppliedMigrations();
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith(".sql"));

  const newMigrations = files.filter(f => !applied.has(f)).sort();

  if (newMigrations.length === 0) {
    console.log("✨ No new migrations.");
    return;
  }

  for (const file of newMigrations) {
    runMigration(file);
  }

  console.log("\n🎉 All migrations complete!");
}

// ----------------------
// CLI
// ----------------------
const command = process.argv[2];

switch (command) {
  case "create":
    createDB();
    break;
  case "migrate":
    migrate();
    break;
  default:
    console.log(`
DB Scripts:
  npm run db:create    → Run the initial database creation
  npm run db:migrate   → Apply all new migrations
  npm run db           → Show this help screen
`);
}

