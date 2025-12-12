# Styling Guidelines

These guidelines define how we structure, implement, and document the API.
They are designed to ensure consistency, maintainability, and predictable behavior across all services and endpoints.

---

## General Principles

- The API is TypeScript-first.
- The API is stateless.
- All behavior should be explicit and predictable.
- Errors must be structured, never ad-hoc.
- Backwards compatibility matters — breaking changes require a major version bump.

## Code Style

### General Rules

- Use **TypeScript** for all source files.
- Follow **ESLint** with TypeScript-specific rules.
- Indentation: **2 spaces**.
- Prefer **explicit types** over inference for public APIs.
- Avoid `any` unless strictly unavoidable.
- Shared and reusable types must live in `/src/types/`.

### Naming Conventions

#### Files & Directories

- Use **camelCase** for files and folders.
  - Example: `userRoutes.ts`, `authMiddleware.ts`

#### Variables & Functions

- Use camelCase.
- Function names should describe intent:
  - Example: `createUser`, `validateToken`.

#### Constants

- Use **UPPER_SNAKE_CASE** for environment variables and config constants.
  - Example: `DATABASE_ENTRY`

## API Design Guidelines

### Routes

- Routes must be **resource-oriented**, not action-oriented.

**Good:**

```pgsql
GET    /users/:id
POST   /projects
DELETE /tokens/:id
```

**Avoid:**

```pgsql
POST /createUser
GET  /deleteProject
```

- Use plural nouns for resources.
- Avoid deep nesting (max 2–3 levels).

---

### HTTP Methods

| Method | Usage |
|---|---|
|GET| Retrieve Data |
|POST| Create a resource |
|PUT| Replace a resource |
|PATCH| Partial update |
|DELETE| Remove a resource |

---

### Request & Response format

- All responses must be JSON by default.
- Always return a consistent structure

#### Success Response

```json
{
  "success": true,
  "code": 200,
  "data:" {}
}
```

---

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

- Errors must be **machine-readable**
- Never expose stack traces or internal details to clients.

> [!IMPORTANT]
> All errors must be created using `customError(client, errorId, origin)`.
>
> Error definitions are stored in `src/static/errors.ts`.

---

### Middleware

- Middleware must be pure and composable.
- Middleware should:
  - Validate Input
  - Authenticate Requests
  - Authorize Access

**Avoid:**

- Business logic in middleware
- Database access unless explicitly required

---

## File Structure

All source code lives under `src/`.

```py
src/
├── routes/           # API route handlers
│   └── users/
│       ├── users.ts
│       └── _helpers.ts
├── middleware/       # Reusable middleware
├── database/         # DB clients, queries
├── utils/            # Shared utilities
├── types/            # Shared TypeScript types
├── tests/            # Unit & integration tests
```

Files prefixed with `_` are ignored by the route loader.

---

### Comments & Documentation

- Explain why, not what.
- Public functions must use **JSDoc**.

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

- Use the centralized logger from `src/utils/logger.ts`.
- Log levels:
  - `debug` - Development details
  - `info` - lifecycle events
  - `warn` - recoverable issues
  - `error` - failures

---

## Git commit style

Use **Conventional Commits**:

- `feat:` New API functionality
- `fix:` Bug fix
- `docs:` Documentation only
- `chore:` Tooling or maintenance
- `refactor:` No behavior change
- `perf:` Performance improvements
- `test:` Tests only
- `build:` Build system changes
- `ci:` CI/CD changes

### Release Process

1. Ensure the API passes linting and tests:

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
    git push --folow-tags origin main
    ```

---

By following these guidelines, we ensure the API remains stable, predictable,
and easy to integrate with — both for internal use and external consumers.
