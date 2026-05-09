"server-only";

import { BACKEND_URL, DEFAULT_HEADERS } from "@/constants";
import { AuthCookies } from "./cookies";
import { refreshTokenAction } from "./refresh-token";

const UNAUTHORIZED = 401;

export async function backendFetch(
  endpoint: string,
  options?: RequestInit,
): Promise<Response> {
  const path = BACKEND_URL + endpoint;

  const buildHeaders = (token: string | null) => ({
    ...DEFAULT_HEADERS,
    ...options?.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  });
  const makeRequest = (token: string | null) =>
    fetch(path, { ...options, headers: buildHeaders(token) });

  const accessToken = await AuthCookies.getAcessToken();
  const response = await makeRequest(accessToken);

  if (response.status === UNAUTHORIZED) {
    const refresh = await refreshTokenAction();

    if (refresh.success) {
      return await makeRequest(refresh.token);
    }
  }

  return response;
}
