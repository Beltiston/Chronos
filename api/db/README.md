# Database

This project supports **both SQLite (local)** and **PostgreSQL (remote)** databases.
The database type is selected automatically based on your configuration.

---

## Default (SQLite)

By default, the project uses **SQLite** and stores the database locally.

- Default database file: `/database/main.db`
  - This path is resolved relative to the project root (`package.json`).

### Create the database

```bash
pnpm run db:create
```

### Apply migrations

```bash
pnpm run db:migrate
```

Running migrations will update the database schema without deleting existing data.

## Using PostgreSQL

To use PostgreSQL instead of SQLite, set the `DATABASE_ENTRY` environment variable to a PostgreSQL connection URL:

```pgsql
DATABASE_ENTRY=postgresql://user:password@host:5432/database
```

When a PostgreSQL URL is detected:

- PostgreSQL migrations will be used
- The database will NOT use a local `.db` file

## SQLite Path Options

When using SQLite, `DATABASE_ENTRY` may be:

> [!NOTE]
> SQLite database paths are resolved relative to the project root (package.json),
> unless an absolute `file://` path is used.

| Format | Description |
|---|---|
| `/database/main.db` | Default path |
| `file:///absolute/path/to/main.dn` | Absolute file path |

All SQLite paths are resolved automatically.

## Migrations

Migrations are stored by database type:

```pgsql
/database/migration/sqlite/
  001_create_database.sql
/database/migration/postgres/
  001_create_database.sql
```

The correct folder is selected automatically based on `DATABASE_ENTRY`.

Applied migrations are tracked in the `migrations` table so each migration only runs once.

## Summary

- SQLite is the default and requires no setup
- PostgreSQL can be enabled via `DATABASE_ENTRY`
- Migrations are safe and non-destructive
- Database type is auto-detected
