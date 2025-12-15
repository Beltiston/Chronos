import { Context } from "hono";
import { ERRORS, ErrorId } from "../static/errors";

export function customError(c: Context, errorId: ErrorId, origin?: string) {
  const error = ERRORS[errorId];
  if (!error) {
    return c.json(
      {
        success: false,
        code: 500,
        error: {
          id: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        },
      },
      500
    );
  }

  return c.json(
    {
      success: false,
      code: error.status,
      error: {
        id: error.id,
        message: error.message,
        ...(origin ? { origin } : {}),
      },
    },
    error.status as any
  );
}
