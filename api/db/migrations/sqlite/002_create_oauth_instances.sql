-- 002_create_oauth_instances.sql

CREATE TABLE IF NOT EXISTS oauth_instances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Auto-incrementing ID
    user_id TEXT NOT NULL,                              -- User ID of the owner
    provider TEXT NOT NULL,                             -- Provider name (github, discord, google, etc.)
    client_id TEXT NOT NULL,                            -- OAuth Client ID
    client_secret TEXT NOT NULL,                        -- OAuth Client Secret
    redirect_uri TEXT,                                  -- OAuth Redirect URI
    created_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 creation date
    updated_at TEXT NOT NULL DEFAULT (datetime('now')), -- ISO 8601 update date
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, provider)                           -- Ensure one config per provider per user
);
