import type { NextConfig } from "next";
import { env } from "@/env";

void env;

const nextConfig: NextConfig = {
  // output: "standalone",  // Uncomment if u wish to deploy using Docker instead of Vercel
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
