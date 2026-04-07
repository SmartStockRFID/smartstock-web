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
    getAll: () => ({ url: "/produtos", method: "GET" }),
  },
  inventory: {
    getAll: () => ({ url: "/inventarios", method: "GET" }),
    close: (id) => ({ url: `/inventarios/${id}/encerrar`, method: "PUT" }),
    reopen: (id) => ({ url: `/inventarios/${id}/reabrir`, method: "PUT" }),
  },
} as const satisfies EndpointsDefinition;
