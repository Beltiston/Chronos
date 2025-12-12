import { z } from "zod";
import { logger } from "./logger";

const envSchema = z.object({
  CHRONOS_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Database
  CLIENT_ORIGIN: z.string().optional(), // optional in schema
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z
    .string()
    .refine(
      (v) => v.startsWith("/") || v.startsWith("http://") || v.startsWith("https://"),
      "BETTER_AUTH_URL must be a URL or a path starting with /"
    ),
    
  // Auth-related
  DISABLE_REGISTRATION: z.string().default("false").transform(v => v === "true"),

  // Server
  PORT: z
    .string()
    .default("3000")
    .transform((v) => Number(v)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = z.flattenError(parsed.error).fieldErrors;
  logger.error("❌ Invalid environment variables:");

  Object.entries(errors).forEach(([key, msgs]) => {
    msgs?.forEach((msg) => {
      logger.error(`  • ${key}: ${msg}`);
    });
  });
  
  process.exit(1);
}

export const env = {
  ...parsed.data,
  CLIENT_ORIGIN: parsed.data.CLIENT_ORIGIN ?? `http://localhost:${parsed.data.PORT}`,
};
