export const ALLOWED_OAUTH_PROVIDERS = [
  "github",
  "vercel",
  "google",
  "discord",
] as const;

export type OAuthProvider = (typeof ALLOWED_OAUTH_PROVIDERS)[number];
