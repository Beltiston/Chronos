import { serve } from '@hono/node-server';
import app from './app';
import { env } from './utils/env';
import { logger } from './utils/logger';

serve({
  fetch: app.fetch,
  port: env.PORT
});

logger.info(`🚀 Server running on port ${env.PORT}`);
