import { betterAuth } from "better-auth";
import { jwtClient } from "better-auth/client/plugins";
import { jwt } from "better-auth/plugins";

import { env } from "@/utils/env";
import { sqlite } from "@/db/auth";

export type Auth = ReturnType<typeof betterAuth>;

export const auth: Auth = betterAuth({
  database: sqlite,
  trustedOrigins: [env.CLIENT_ORIGIN],
  emailAndPassword: {
    enabled: true,
    disableSignUp: env.DISABLE_REGISTRATION === true,
  },
  plugins: [jwt(), jwtClient()],
});
