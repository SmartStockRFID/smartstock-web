export interface APIErrorDTO {
  detail: string;
}

export type ReactQueryRequestStatus = "pending" | "success" | "error";
/* --------------------------------- PRODUCT -------------------------------- */

export interface Product {
  id: number;
  name: string;
  productCode: string;
}

export interface GetProductDTO {
  id: number;
  nome: string;
  codigo_produto: string;
}

export interface CreateProductDTO {
  nome: string;
  codigo_produto: string;
  descricao: string;
  localizacao: string;
}

export type UpdateProductDTO = Omit<GetProductDTO, "id">;

/* -------------------------------- INVENTORY ------------------------------- */

export type InventoryStatus = "iniciada" | "finalizada" | "cancelada";

export interface InventorySummary {
  id: number;
  status: InventoryStatus;
  employeeUsername: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllInventoryDTO {
  id: number;
  status: InventoryStatus;
  username_funcionario: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryReading {
  id: number;
  productCode: string;
  lastReadTimestamp: Date;
  quantity: number;
}

export interface ReadingDTO {
  id: number;
  codigo_produto: string;
  ultima_leitura: string;
  quantidade: number;
}

/* ---------------------------------- AUTH ---------------------------------- */

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
  refresh_token: string;
  access_expire: string;
  refresh_expire: string;
}

export interface CreateUserResponseDTO {
  id: number;
  username: string;
  role: string;
}

export interface Employee {
  id: number;
  username: string;
  role: string;
  is_active: boolean;
}

export interface CreateEmployeeDTO {
  username: string;
  role: string;
  password: string;
}
