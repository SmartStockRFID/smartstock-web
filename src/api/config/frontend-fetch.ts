import { backendRedirectRoute } from "@/constants";

export async function frontendFetch(path: string, options: RequestInit) {
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return fetch(`${backendRedirectRoute}/${path}`, {
    ...options,
    credentials: "include",
  });
}
