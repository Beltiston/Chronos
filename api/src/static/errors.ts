export type ErrorId =
  | "RATE_LIMIT_EXCEEDED"
  | "USER_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "VALIDATION_ERROR"
  | "AUTH_EMAIL_ALREADY_EXISTS"
  | "AUTH_REGISTRATION_DISABLED"
  | "AUTH_USERNAME_ALREADY_EXISTS"
  | "OAUTH_INVALID_PROVIDER"
  | "OAUTH_INSTANCE_ALREADY_EXISTS"
  | "OAUTH_INSTANCE_NOT_FOUND";

export interface ErrorDetails {
  id: ErrorId;
  status: number;
  message: string;
}

export const ERRORS: Record<ErrorId, ErrorDetails> = {
  VALIDATION_ERROR: {
    id: "VALIDATION_ERROR",
    status: 400,
    message: "Invalid input",
  },
  AUTH_REGISTRATION_DISABLED: {
    id: "AUTH_REGISTRATION_DISABLED",
    status: 403,
    message: "Registration is disabled",
  },
  AUTH_USERNAME_ALREADY_EXISTS: {
    id: "AUTH_USERNAME_ALREADY_EXISTS",
    status: 409,
    message: "Username already exists",
  },
  USER_NOT_FOUND: {
    id: "USER_NOT_FOUND",
    status: 404,
    message: "The requested user does not exist",
  },
  AUTH_EMAIL_ALREADY_EXISTS: {
    id: "AUTH_EMAIL_ALREADY_EXISTS",
    status: 409,
    message: "Email already exists",
  },
  RATE_LIMIT_EXCEEDED: {
    id: "RATE_LIMIT_EXCEEDED",
    status: 429,
    message: "Too many requests, please try again later.",
  },
  INTERNAL_SERVER_ERROR: {
    id: "INTERNAL_SERVER_ERROR",
    status: 500,
    message: "Internal Server Error",
  },
  OAUTH_INVALID_PROVIDER: {
    id: "OAUTH_INVALID_PROVIDER",
    status: 400,
    message: "Invalid OAuth provider",
  },
  OAUTH_INSTANCE_ALREADY_EXISTS: {
    id: "OAUTH_INSTANCE_ALREADY_EXISTS",
    status: 409,
    message: "OAuth instance already exists for this provider",
  },
  OAUTH_INSTANCE_NOT_FOUND: {
    id: "OAUTH_INSTANCE_NOT_FOUND",
    status: 404,
    message: "OAuth instance not found",
  },
};
