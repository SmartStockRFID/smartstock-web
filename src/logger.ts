import pinoLogger from "pino";

const IS_DEV = process.env.NODE_ENV === "development";

export const logger = pinoLogger({ level: IS_DEV ? "trace" : "debug" });
