-- 001_Create_Database.sql for SQLite

-- Table to track applied migrations
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,                                -- UUID stored as TEXT
    username TEXT NOT NULL UNIQUE,                      -- Username 
    role TEXT NOT NULL DEFAULT 'user',                  -- User role (user, admin)
    auth_id TEXT NOT NULL UNIQUE,                       -- UserID of Better-AUTH Database
    projects TEXT DEFAULT '[]',                         -- Array of projectIDs
    machines TEXT DEFAULT '[]',                         -- Array of machineIDs
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))  -- ISO 8601 update date
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Auto-incrementing ID
    projectUUID TEXT NOT NULL UNIQUE,                   -- Project UUID used to verify project
    user_id TEXT NOT NULL,                              -- User ID of the owner
    name TEXT NOT NULL,                                 -- Project name
    users TEXT DEFAULT '[]',                            -- Array of userIDs
    files TEXT DEFAULT '[]',                            -- Array of fileIDs
    languages TEXT DEFAULT '[]',                        -- Array of languageIDs
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 update date
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Heartbeats table
CREATE TABLE IF NOT EXISTS machine (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Auto-incrementing ID
    user_id TEXT NOT NULL,                              -- User ID of the owner
    name TEXT NOT NULL,                                 -- Machine name (hostname)
    operating_system TEXT NOT NULL,                     -- Operating system
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 update date
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Machine tokens table
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Auto-incrementing ID
    name TEXT NOT NULL,                                 -- Language name
    project_id TEXT NOT NULL,                           -- Project UUID of the owner
    user_id TEXT NOT NULL,                              -- User ID of the owner
    timespent TEXT NOT NULL DEFAULT '0',                -- Timespend in seconds
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 update date
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Auto-incrementing ID
    name TEXT NOT NULL,                                 -- File name
    location TEXT NOT NULL,                             -- File location in relative to the project
    project_id TEXT NOT NULL,                           -- Project ID of the owner
    user_id TEXT NOT NULL,                              -- User ID of the owner
    language_id TEXT NOT NULL,                          -- Language ID of the owner
    timespent TEXT NOT NULL DEFAULT '0',                -- Timespend in seconds
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),  -- ISO 8601 update date
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);