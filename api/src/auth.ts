import { betterAuth } from "better-auth";
import { env } from "./utils/env.js";
import { sqlite } from "./db/auth.js";

export type Auth = ReturnType<typeof betterAuth>;

export const auth: Auth = betterAuth({
  database: sqlite,
  trustedOrigins: [env.CLIENT_ORIGIN],
  emailAndPassword: {
    enabled: true,
    disableSignUp: env.DISABLE_REGISTRATION === true,
  },
});
