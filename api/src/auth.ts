import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import Database from "better-sqlite3";

import { env } from "@/utils/env";

export const auth = betterAuth({
  database: new Database("auth.db"),
  trustedOrigins: [env.CLIENT_ORIGIN],
  emailAndPassword: {
    enabled: true,
    disableSignUp: env.DISABLE_REGISTRATION === true,
  },
  plugins: [
    bearer(),
  ],
});
