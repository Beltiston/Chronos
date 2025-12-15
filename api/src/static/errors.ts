export type ErrorId =
  | "RATE_LIMIT_EXCEEDED"
  | "USER_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR";

export interface ErrorDetails {
  id: ErrorId;
  status: number;
  message: string;
}

export const ERRORS: Record<ErrorId, ErrorDetails> = {
  RATE_LIMIT_EXCEEDED: {
    id: "RATE_LIMIT_EXCEEDED",
    status: 429,
    message: "Too many requests, please try again later.",
  },
  USER_NOT_FOUND: {
    id: "USER_NOT_FOUND",
    status: 404,
    message: "The requested user does not exist",
  },
  INTERNAL_SERVER_ERROR: {
    id: "INTERNAL_SERVER_ERROR",
    status: 500,
    message: "Internal Server Error",
  },
};
