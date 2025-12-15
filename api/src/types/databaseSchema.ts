import { Generated } from "kysely";
import { OAuthProvider } from "./oauthProvider";

export interface DatabaseSchema {
  migrations: {
    id: Generated<number>;
    filename: string;
    applied_at: Generated<string>;
  };
  users: {
    id: string; // UUID stored as TEXT
    username: string;
    role: Generated<string>; // 'user' | 'admin'
    auth_id: string;
    projects: Generated<string>; // JSON array
    machines: Generated<string>; // JSON array
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
  projects: {
    id: Generated<number>;
    projectUUID: string;
    user_id: string;
    name: string;
    users: Generated<string>; // JSON array
    files: Generated<string>; // JSON array
    languages: Generated<string>; // JSON array
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
  machine: {
    id: Generated<number>;
    user_id: string;
    name: string;
    operating_system: string;
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
  languages: {
    id: Generated<number>;
    name: string;
    project_id: string;
    user_id: string;
    timespent: Generated<string>;
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
  files: {
    id: Generated<number>;
    name: string;
    location: string;
    project_id: string;
    user_id: string;
    language_id: string;
    timespent: Generated<string>;
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
  oauth_instances: {
    id: Generated<number>;
    user_id: string;
    provider: OAuthProvider;
    client_id: string;
    client_secret: string;
    redirect_uri: string | null;
    created_at: Generated<string>;
    updated_at: Generated<string>;
  };
}
