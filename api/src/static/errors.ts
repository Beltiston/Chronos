export type ErrorId =
  | "RATE_LIMIT_EXCEEDED"
  | "USER_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "VALIDATION_ERROR"
  | "AUTH_EMAIL_ALREADY_EXISTS";

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
};
