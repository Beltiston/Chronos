# Styling Guidelines

These guidelines define how code **must be written and structured** in this repository.
They apply to **all contributors and all AI agents**.
Deviations are considered incorrect unless explicitly requested.

---

## General Principles

* TypeScript-first at all times
* The API is stateless
* All behavior must be explicit and predictable
* Errors must be structured, never ad-hoc
* Backwards compatibility matters — breaking changes require a **major** version bump

---

## Code Style

### General Rules

* Use **TypeScript** for all source files
* Follow ESLint with TypeScript-specific rules
* Indentation: **2 spaces** (no tabs)
* Prefer **explicit types** for public APIs
* Avoid `any` unless strictly unavoidable
* Shared and reusable types **must** live in `/src/types`

---

### Naming Conventions

#### Files & Directories

* Use **camelCase** for files and folders

Examples:

* `userRoutes.ts`
* `authMiddleware.ts`

#### Variables & Functions

* Use `camelCase`
* Names must describe intent

Examples:

* `createUser`
* `validateToken`

#### Constants

* Use **UPPER_SNAKE_CASE** for environment variables and config constants

Example:

* `DATABASE_ENTRY`

---

## API Design Guidelines

### Routes

* Routes must be **resource-oriented**, not action-oriented
* Use **plural nouns** for resources
* Avoid deep nesting (maximum 2–3 levels)

✅ Good:

```
GET    /users/:id
POST   /projects
DELETE /tokens/:id
```

❌ Avoid:

```
POST /createUser
GET  /deleteProject
```

---

### HTTP Methods

| Method | Usage              |
| ------ | ------------------ |
| GET    | Retrieve data      |
| POST   | Create a resource  |
| PUT    | Replace a resource |
| PATCH  | Partial update     |
| DELETE | Remove a resource  |

---

### Request & Response Format

* All responses must be **JSON**
* Response structure must be **consistent**

#### Success Response

```json
{
  "success": true,
  "code": 200,
  "data": {}
}
```

#### Error Response

```json
{
  "success": false,
  "code": 404,
  "error": {
    "id": "USER_NOT_FOUND",
    "message": "The requested user does not exist"
  }
}
```

---

### Error Handling

* Errors must be **machine-readable**
* Never expose stack traces or internal details

> IMPORTANT
> All errors **must** be created using:
> `customError(client, errorId, origin)`
>
> Error definitions live in `src/static/errors.ts`

---

### Middleware

* Middleware must be **pure** and **composable**
* Middleware responsibilities:

  * Input validation
  * Authentication
  * Authorization

❌ Avoid:

* Business logic in middleware
* Database access unless explicitly required

---

## File Structure

All source code lives under `src/`.

```yaml
src/
├── routes/           # API route handlers
│   └── users/
│       ├── users.ts
│       └── _helpers.ts
├── middleware/       # Reusable middleware
├── database/         # DB clients and queries
├── utils/            # Shared utilities
├── types/            # Shared TypeScript types
├── __test__/         # Unit & integration tests
```

* Files prefixed with `_` are ignored by the route loader

---

### Comments & Documentation

* Explain **why**, not what
* Public functions must include **JSDoc**

```ts
/**
 * Creates a new API token for a machine.
 * @param machineId - Unique machine identifier
 * @returns The generated token
 */
export function createMachineToken(machineId: string): string {
  // implementation
}
```

---

### Logging

* Use the centralized logger from `src/utils/logger.ts`
* Log levels:

  * `debug` — development details
  * `info` — lifecycle events
  * `warn` — recoverable issues
  * `error` — failures

---

## Git Commit Style

Use **Conventional Commits**:

* `feat:` New functionality
* `fix:` Bug fix
* `docs:` Documentation only
* `chore:` Tooling or maintenance
* `refactor:` No behavior change
* `perf:` Performance improvements
* `test:` Tests only
* `build:` Build system changes
* `ci:` CI/CD changes

---

## Release Process

1. Ensure linting and tests pass

```bash
pnpm run lint:all
pnpm run test
```

2. Create a release

```bash
pnpm run release
```

3. Push commits and tags

```bash
git push --follow-tags origin main
```

---

By following these rules, the API remains stable, predictable, and consistent for both humans and automated tooling.
