import type { NextConfig } from "next";
import { env } from "@/env";

void env;

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  typedRoutes: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
