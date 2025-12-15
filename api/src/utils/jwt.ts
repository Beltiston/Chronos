import jwt from "jsonwebtoken";
import { env } from "./env";

export interface JwtPayload {
  userId: string;
  username: string;
  role: string;
}

/**
 * Generate an API token for a user
 * @param userId - User ID from the users table
 * @param username - Username
 * @param role - User role (user, admin, etc.)
 * @returns JWT token string
 */
export function generateApiToken(
  userId: string,
  username: string,
  role: string
): string {
  const payload: JwtPayload = {
    userId,
    username,
    role,
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "30d", // 30 days
    issuer: "chronos-api",
    audience: "chronos-client",
  });
}

/**
 * Verify and decode an API token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function verifyApiToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: "chronos-api",
      audience: "chronos-client",
    }) as JwtPayload;

    return decoded;
  } catch (error) {
    // Token is invalid, expired, or malformed
    return null;
  }
}
