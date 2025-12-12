-- 001_Create_Database.sql for SQLite

-- Table to track applied migrations
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- UUID stored as TEXT
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'moderator', 'admin')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Heartbeats table
CREATE TABLE IF NOT EXISTS heartbeats (
    id TEXT PRIMARY KEY, -- UUID
    heartbeat_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    entity TEXT NOT NULL,
    project TEXT NOT NULL,
    language TEXT,
    editor TEXT NOT NULL,
    machine TEXT,
    timestamp TEXT NOT NULL,
    is_write INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Machine tokens table
CREATE TABLE IF NOT EXISTS machine_tokens (
    id TEXT PRIMARY KEY, -- UUID
    machine_id TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    expires_at TEXT
);
