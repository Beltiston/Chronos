import { GeneratedAlways } from "kysely";

export interface DatabaseSchema {
  heartbeats: {
    id: GeneratedAlways<string>; // Generated ID
    heartbeat_id: string;        // Heartbeat UUID
    user_id: string;             // user ID
    entity: string;              // e.g., file path or function name
    project: string;             // project name
    language: string | null;     // Project Language
    editor: string;              // Editor Name
    machine: string | null;      // machine id
    timestamp: string;           // ISO date string
    is_write: number;           // true if user was writing, false if just viewing
  };
  machine_tokens: {
    id: GeneratedAlways<string>;
    machine_id: string;
    token: string;                       // generated token for API auth
    created_at: string;
    expires_at: string | null;           // expiration
  };
  Migrations: {
    id: GeneratedAlways<number>; //
    filename: string;
    applied_at: string;
  };
  projects: {
    id: GeneratedAlways<number>;
    user_id: number;
    name: string;
    created_at: string;
  };
  users: {
    id: GeneratedAlways<string>;
    username: string;
    email: string;
    password_hash: string;
    role: 'user' | 'moderator' | 'admin';
    created_at: string;
  };
}
