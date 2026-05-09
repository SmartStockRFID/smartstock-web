import { BACKEND_URL } from "@/constants";
import { logger } from "@/logger";
import type { LoginResponseDTO } from "@/types";
import { AuthCookies } from "./cookies";
import { ApiEndpoints } from "./endpoints";

interface RefreshReturn {
  success: boolean;
  token: string | null;
}

let refreshPromise: Promise<RefreshReturn> | null = null;

/**
 * Faz refresh dos tokens de forma thread-safe
 * Evita múltiplas chamadas simultâneas de refresh
 */
export async function refreshTokenAction(): Promise<RefreshReturn> {
  if (refreshPromise) return refreshPromise;

  async function doRefresh() {
    const { refresh: refreshToken } = await AuthCookies.getTokens();

    if (!refreshToken) {
      await AuthCookies.deleteTokens();
      return { success: false, token: null };
    }

    try {
      const endpoint = ApiEndpoints.auth.refresh();

      const res = await fetch(BACKEND_URL + endpoint.url, {
        method: endpoint.method,
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        await AuthCookies.deleteTokens();
        return { success: false, token: null };
      }

      const tokens: LoginResponseDTO = await res.json();
      await AuthCookies.setTokens(tokens);
      return { success: true, token: tokens.access_token };
    } catch (err) {
      logger.error(`Error refreshing access token! ${err}`);
      return { success: false, token: null };
    } finally {
      setTimeout(() => {
        refreshPromise = null;
      }, 500);
    }
  }

  refreshPromise = doRefresh();

  return refreshPromise;
}
