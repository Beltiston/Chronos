/*
 * File: index.ts                                                              *
 * Project: chronos                                                            *
 * Created Date: Sunday, 14th December 2025 5:22:55 pm                         *
 * Author: Lynnux                                                              *
 * -----                                                                       *
 * Last Modified: Sun Dec 14 2025                                              *
 * Modified By: Lynnux                                                         *
 * -----                                                                       *
 * Copyright (c) 2025 Beltiston                                                *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                     *
 * ----------	---	---------------------------------------------------------    *
 */

import { serve } from "@hono/node-server";
import app from "./app";
import { env } from "./utils/env";
import { logger } from "./utils/logger";

serve({
  fetch: app.fetch,
  port: env.PORT,
});

logger.info(`🚀 Server running on port ${env.PORT}`);
