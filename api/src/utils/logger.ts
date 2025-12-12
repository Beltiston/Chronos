import pino from "pino";

const isDev = process.env.CHRONOS_ENV !== "production";

export const logger = pino(
  {
    level: isDev ? "debug" : "info",
    base: { pid: false },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  isDev
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      })
    : undefined
);
