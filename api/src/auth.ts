import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";

import { env } from "@/utils/env";

import { authSqlite, sqlite } from "@/db/auth";

export type Auth = ReturnType<typeof betterAuth>;

export const auth: Auth = betterAuth({
  database: sqlite,
  trustedOrigins: [env.CLIENT_ORIGIN],
  emailAndPassword: {
    enabled: true,
    disableSignUp: env.DISABLE_REGISTRATION === true,
  },
  plugins: [bearer()],
});
