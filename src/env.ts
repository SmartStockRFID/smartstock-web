import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { removeSlahAtEndOfUrl } from "./utils";

export const env = createEnv({
  server: {
    INTERNAL_SSRFID_API_URL: z.url().transform(removeSlahAtEndOfUrl),
  },
  client: {
    NEXT_PUBLIC_THEME_MODE: z.enum(["app", "newland"]).default("app"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_THEME_MODE: process.env.NEXT_PUBLIC_THEME_MODE,
  },
});
