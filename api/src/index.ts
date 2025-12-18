/*
 * File: index.ts                                                              *
 * Project: chronos-backend                                                    *
 * Created Date: Sunday, 14th December 2025 5:22:55 pm                         *
 * Author: Lynnux                                                              *
 * -----                                                                       *
 * Last Modified: Thu Dec 18 2025                                              *
 * Modified By: Lynnux                                                         *
 * -----                                                                       *
 * Copyright (c) 2025 Beltiston                                                *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                     *
 * ----------	---	---------------------------------------------------------    *
 */

import { serve } from "@hono/node-server";
import app from "./app.js";
import { env } from "./utils/env.js";
import { logger } from "./utils/logger.js";

serve({
  fetch: app.fetch,
  port: env.PORT,
});

logger.info(`🚀 Server running on port ${env.PORT}`);
