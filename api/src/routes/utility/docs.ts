import { Method, RouteMiddleware } from "@/types/route";
import { Scalar } from "@scalar/hono-api-reference";

const docs: RouteMiddleware = {
  endpoint: "/docs",
  method: Method.GET,
  private: false,
  standalone: true,
  rateLimit: {
    windowMs: 60 * 1000,
    limit: 100,
  },
  handler: Scalar({
    url: "/assets/openapi.json",
    showSidebar: true,
    hideSearch: false,
    hideClientButton: true,
    showDeveloperTools: "never",
    theme: "deepSpace",
  }),
};

export default docs;
