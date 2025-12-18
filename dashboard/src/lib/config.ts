/**
 * Centralized API configuration
 */

export const CONFIG = {
  // Use NEXT_PUBLIC_ prefix to expose to the browser
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
};
