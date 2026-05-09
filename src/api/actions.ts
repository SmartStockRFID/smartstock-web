"use server";

import { BACKEND_URL, DEFAULT_HEADERS } from "@/constants";
import type {
  APIErrorDTO,
  CreateEmployeeDTO,
  Employee,
  InventorySummary,
  LoginRequestDTO,
  LoginResponseDTO,
} from "@/types";
import { backendFetch } from "./config/backend-fetch";
import { AuthCookies } from "./config/cookies";
import { ApiEndpoints } from "./config/endpoints";
import { safeRequest } from "./config/safe-request";

export async function loginAction(
  credentials: LoginRequestDTO,
): Promise<{ message: string; success: boolean }> {
  const formData = new URLSearchParams();

  for (const [key, value] of Object.entries(credentials)) {
    formData.append(key, value);
  }

  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    body: formData.toString(),
    method: "POST",
    headers: {
      ...DEFAULT_HEADERS,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    const error: APIErrorDTO = await res.json();
    return { message: error.detail, success: false };
  }

  const body: LoginResponseDTO = await res.json();

  await AuthCookies.setTokens(body);

  return { message: "Logado com sucesso! Redirecionando...", success: true };
}

export async function createEmployee(
  payload: CreateEmployeeDTO,
): Promise<Employee> {
  const endpoint = "/usuarios";
  const req = () =>
    backendFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    });

  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  const body: Employee = await res.json();

  return body;
}

export async function logoutAction() {
  await AuthCookies.deleteTokens();
}

export async function activateEmployee(employeeId: number): Promise<Employee> {
  const endpoint = `/usuarios/${employeeId}/ativar`;
  const req = () =>
    backendFetch(endpoint, {
      method: "PUT",
    });

  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  const body: Employee = await res.json();

  return body;
}

export async function deactivateEmployee(
  employeeId: number,
): Promise<Employee> {
  const endpoint = `/usuarios/${employeeId}/inativar`;
  const req = () =>
    backendFetch(endpoint, {
      method: "PUT",
    });

  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  return await res.json();
}

export async function cancelInventory(
  inventoryId: number,
): Promise<InventorySummary> {
  const endpoint = `/inventarios/${inventoryId}/cancelar`;
  const req = () =>
    backendFetch(endpoint, {
      method: "PUT",
    });

  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  return await res.json();
}

export async function finishInventory(
  inventoryId: number,
): Promise<InventorySummary> {
  const endpoint = ApiEndpoints.inventory.close(inventoryId.toString());
  const req = () =>
    backendFetch(endpoint.url, {
      method: endpoint.method,
    });

  const res = await safeRequest(req);
  if (!(res instanceof Response)) {
    throw res;
  }

  return await res.json();
}

export async function reopenInventory(
  inventoryId: number,
): Promise<InventorySummary> {
  const endpoint = ApiEndpoints.inventory.reopen(inventoryId.toString());

  const req = () =>
    backendFetch(endpoint.url, {
      method: endpoint.method,
    });

  const res = await safeRequest(req);
  if (!(res instanceof Response)) {
    throw res;
  }

  return await res.json();
}
