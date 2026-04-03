import type { NextRequest } from "next/server";
import { backendFetch } from "@/api/config/backend-fetch";
import { routeHandlerRedirect } from "@/api/config/route-handler-redirect";
import { backendRedirectRoute } from "@/constants";

export async function GET(req: NextRequest): Promise<Response> {
  return routeHandlerRedirect(req, backendRedirectRoute, backendFetch);
}
