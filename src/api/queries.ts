import type {
  Employee,
  GetAllInventoryDTO,
  GetProductDTO,
  InventoryReading,
  InventorySummary,
  Product,
  ReadingDTO,
} from "@/types";
import { ApiEndpoints } from "./config/endpoints";
import { frontendFetch } from "./config/frontend-fetch";
import { safeRequest } from "./config/safe-request";

export async function getProducts(): Promise<Product[]> {
  const endpoint = ApiEndpoints.product.getAll();

  const req = () =>
    frontendFetch(endpoint.url, {
      method: endpoint.method,
    });

  const res = await safeRequest(req);
  if (!(res instanceof Response)) {
    throw res;
  }

  const body: GetProductDTO[] = await res.json();

  const parse = (p: GetProductDTO): Product => {
    return {
      id: p.id,
      name: p.nome,
      productCode: p.codigo_produto,
    };
  };

  return body.map(parse);
}

export async function getInventories(): Promise<InventorySummary[]> {
  const endpoint = ApiEndpoints.inventory.getAll();

  const req = () => frontendFetch(endpoint.url, { method: endpoint.method });
  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  const body: GetAllInventoryDTO[] = await res.json();

  const parse = (i: GetAllInventoryDTO): InventorySummary => {
    return {
      id: i.id,
      status: i.status,
      employeeUsername: i.username_funcionario,
    };
  };

  return body.map(parse).toReversed();
}

export async function getInventoryReadings(
  id: number,
): Promise<InventoryReading[]> {
  const endpoint = `/conferencia/${id}/leituras?limit=50&offset=0`;
  const req = () => frontendFetch(endpoint, {});

  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  const body: { items: ReadingDTO[] } = await res.json();

  const parse = (read: ReadingDTO): InventoryReading => ({
    id: read.id,
    lastReadTimestamp: new Date(read.ultima_leitura),
    productCode: read.codigo_produto,
    quantity: read.quantidade,
  });

  return body.items.map(parse);
}

export async function getEmployees(): Promise<Employee[]> {
  const endpoint = "/usuarios";
  const req = () => frontendFetch(endpoint, {});
  const res = await safeRequest(req);

  if (!(res instanceof Response)) {
    throw res;
  }

  const body: Employee[] = await res.json();

  return body.toReversed();
}

export async function getInventoriePdf(inventoryId: number): Promise<Blob> {
  const endpoint = `/relatorios/pdf/?conferencia_id=${inventoryId}`;

  const res = await frontendFetch(endpoint, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });

  if (!(res instanceof Response)) {
    throw res;
  }

  return await res.blob();
}
