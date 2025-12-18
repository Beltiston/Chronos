import type { MiddlewareHandler, Context } from "hono";
import type { DescribeRouteOptions } from "hono-openapi";

export enum Method {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
}

export enum RouteVersion {
  STABLE = "stable",
  BETA = "beta",
  ALPHA = "alpha",
}

export interface RouteConfig {
  endpoint: string;
  method: Method;
  private?: boolean;
  version?: RouteVersion;
  standalone?: boolean;
  roles?: ("user" | "moderator" | "admin")[];
  handler: (c: Context) => Promise<Response>;
  schema?: any;
  rateLimit?: {
    windowMs?: number;
    limit?: number;
  };
  openapi?: DescribeRouteOptions;
}

export interface RouteMiddleware {
  endpoint: string;
  method: Method;
  private: boolean;
  version?: RouteVersion;
  standalone?: boolean;
  rateLimit?: {
    windowMs: number;
    limit: number;
  };
  handler: MiddlewareHandler;
}

export interface SuccessResponse<T = any> {
  success: true;
  code: number;
  data: T;
}
