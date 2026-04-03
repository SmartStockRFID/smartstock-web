type HTTPVerb = "GET" | "PUT" | "POST" | "DELETE";

interface Endpoint {
  url: string;
  method: HTTPVerb | null;
}

type EndpointCreator = (...args: string[]) => Endpoint;

interface EndpointsDefinition {
  [key: string]: EndpointCreator | EndpointsDefinition;
}

export const ApiEndpoints = {
  auth: {
    login: () => ({ url: "/auth/login", method: "POST" }),
    refresh: () => ({ url: "/auth/refresh", method: "POST" }),
  },
  product: {
    getAll: () => ({ url: "/pecas", method: "GET" }),
  },
  inventory: {
    getAll: () => ({ url: "/conferencia", method: "GET" }),
    close: (id) => ({ url: `/conferencia/${id}/encerrar`, method: "PUT" }),
    reopen: (id) => ({ url: `/conferencia/${id}/reabrir`, method: "PUT" }),
  },
} as const satisfies EndpointsDefinition;
