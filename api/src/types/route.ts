import { Context } from "hono";

export enum Method {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
}

export interface RouteConfig {
  endpoint: string;
  method: Method;
  private?: boolean;
  roles?: ("user" | "moderator" | "admin")[];
  handler: (c: Context) => Promise<Response>;
  schema?: any;
}
