# Chronos Codebase Rules

This repository is a **monorepo**. Agents must respect workspace boundaries and tooling choices.

---

## Monorepo Layout

- Root repo: Chronos
- Workspaces:
  - /api → Hono-based Node.js API (CURRENT FOCUS)
  - /dashboard → Next.js web app
  - /plugins/(pluginName) → VS Code extensions, browser extensions, etc.

⚠️ Unless explicitly instructed, ONLY modify `/api`.

---

## Runtime & Tooling

- Node.js: v22 (required)
- Package manager: pnpm ONLY
  - Enforced via `only-allow pnpm`
  - Never suggest npm or yarn
- pnpm version: `pnpm@10.11.0`
- TypeScript: ^5.9
- OS assumptions: Linux-first (Nix-friendly)
- shell: omz

---

## Module System & Language

- Language: TypeScript
- Module system: **ESM**
  - `"type": "module"` is set
  - Use `import/export`
  - Do NOT introduce CommonJS syntax in `/api`

- Path aliases are handled via:
  - `tsconfig-paths/register`

---

## API Stack (`/api`)

- Framework: **Hono**
- Server: `@hono/node-server`
- Auth: `better-auth`
- Validation: `zod`
- Database:
  - Query builder: **Kysely**
  - SQLite (`better-sqlite3`) and PostgreSQL supported
- IDs: `nanoid`
- Logging: `pino`

---

## Development & Scripts

- Dev server:
  - `pnpm dev`
  - Uses `tsx` + `nodemon`
- Build:
  - `pnpm build`
  - Uses `tsconfig.build.json`
- Start (production):
  - `node dist/src/index.js`

### Database Scripts

- `pnpm db`
- `pnpm db:create`
- `pnpm db:migrate`

These scripts are executed via `dotenvx` and must not be rewritten.

---

## API Project Structure

```yaml
/api
├── src
│ ├── index.ts # Entry point
│ ├── app.ts # Hono app setup
│ ├── auth.ts # Authentication logic
│ ├── routes # Route definitions (grouped by modules)
│ ├── middleware # Auth and general middleware
│ ├── db # Kysely instance & utilities
│ ├── utils # Shared helpers
│ ├── types # Global & route types
│ └── __test__ # Vitest tests
├── db
│ ├── migrations # SQL migrations (sqlite + postgres)
│ └── main.db # Local dev database
├── scripts # CLI / maintenance scripts
└── dist # typescript build DO NOT EDIT
```

### Routing Rules

- Routes live under `src/routes`
- Group routes by modules (e.g. `time`, `user`)
- Route helpers should be small and be located in files starting with a `_`.
- Prefer typed route helpers from `utils/routeHandler.ts`
- routeHandler does not load files starting with `_` so file helpers can use those files. (example: `_time.ts` is a helper for `currentTime.ts`)

---

## Database Rules

- Kysely is the **only** query builder
- Database schema types live in:
  - `src/types/databaseSchema.ts`
- Migrations are SQL files, not generated code
- Do NOT introduce ORMs (Prisma, TypeORM, etc.)

---

## Testing

- Test runner: **Vitest**
- Test configs:
  - `tsconfig.test.json`
  - `vitest.config.ts`
- Nix-specific tests live in:
  - `src/__test__/nix`

---

## Coding Rules

- Follow existing patterns exactly
- Prefer explicit, readable code
- Avoid over-abstraction
- Do NOT refactor unrelated files
- Do NOT reformat code unless requested
- Do NOT change public APIs without instruction

---

## Agent Permissions

### Allowed

- Modify files inside `/api` when relevant
- Add new routes, middleware, or utilities when explicitly requested
- Extend existing patterns

### Not Allowed

- Mass refactors
- Dependency upgrades
- Changing `Node` / `pnpm` versions
- Switching frameworks or libraries
- Touching `/dashboard` or `/plugins` unless explicitly told

---

## Common Pitfalls

- Do not assume npm or yarn
- Do not introduce CommonJS in `/api`
- Do not auto-generate migrations
- Do not bypass Kysely
- Do not change database engines

---

## Styling

- All code MUST follow `.agent/rules/styling.md`
- Styling rules override agent defaults
