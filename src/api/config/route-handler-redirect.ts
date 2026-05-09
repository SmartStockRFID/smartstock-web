import type { NextRequest } from "next/server";

export async function routeHandlerRedirect(
  req: NextRequest,
  redirectRoute: string,
  client: (endpoint: string, options?: RequestInit) => Promise<Response>,
) {
  const url = req.nextUrl;

  const endpoint = url.pathname.replace(redirectRoute, "");
  const searchParams = url.searchParams.toString();

  const path = `${endpoint}?${searchParams}`;

  const requestInit: RequestInit = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    signal: req.signal,
    cache: "no-store",
  };

  return await client(path, requestInit);
}
