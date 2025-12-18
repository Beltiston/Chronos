import fs, { readFileSync } from "fs";
import { generateSpecs } from "hono-openapi";

import app from "../app.js";
import { resolve } from "path";
import { env } from "./env.js";

const file = "public/openapi.json";

async function main() {
  const spec = await generateSpecs(app, {
    documentation: {
      info: {
        title: "Chronos API",
        summary:
          "API for Chronos, enabling time tracking, activity logging, and project analytics.",
        description:
          "A self-hosted API for tracking time, user activity, and project metrics across multiple environments.",
        contact: {
          name: "Contact Maintainer",
          url: "https://github.com/Beltiston/Chronos",
          email: "support@lynnux.xyz",
        },
        license: {
          name: "GNU Lesser General Public License v3.0 or later",
          identifier: "LGPL-3.0-or-later",
          url: "https://github.com/Beltiston/Chronos/blob/main/LICENSE",
        },
        termsOfService: `${env.API_ORIGIN}/termsOfService`,
        version: getAppVersion(),
      },
      jsonSchemaDialect: "https://json-schema.org/draft/2020-12/schema",
      servers: [
        { url: "/v1", description: "stable endpoints" },
        { url: "/v2", description: "beta endpoints" },
        { url: "/v3", description: "alpha endpoints" },
      ],
      components: {
        schemas: {
          SuccessResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              code: { type: "integer", example: 200 },
              data: { type: "object", description: "The actual payload" },
            },
            required: ["success", "code", "data"],
          },
          ErrorResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              code: { type: "integer", example: 404 },
              error: {
                type: "object",
                properties: {
                  id: { type: "string", example: "INTERNAL_SERVER_ERROR" },
                  code: { type: "integer", example: 500 },
                  message: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                },
                required: ["id", "code", "message"],
              },
            },
            required: ["success", "code", "error"],
          },
        },
      },
    },
  });

  fs.writeFileSync(file, JSON.stringify(spec, null, 2));

  console.log(`OpenAPI spec generated at ${file}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * @returns The version of the app from package.json
 */
function getAppVersion(): string {
  const packageJsonPath = resolve(process.cwd(), "package.json");
  const packageJsonContent = readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);
  return packageJson.version;
}
