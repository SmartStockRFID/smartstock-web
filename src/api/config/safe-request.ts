import { ExternalAPIException, NetworkFetchException } from "@/exceptions";

type FetchClient = (
  request: () => Promise<Response>,
  extraOptions?: { skipErrorOnThisCodes?: number[] },
) => Promise<Response | ExternalAPIException | NetworkFetchException>;

export const safeRequest: FetchClient = async (
  request,
  options,
): Promise<Response | ExternalAPIException | NetworkFetchException> => {
  const skipError = (statusCode: number) =>
    options?.skipErrorOnThisCodes?.includes(statusCode);

  let response: Response;

  try {
    response = await request();
  } catch (err) {
    return new NetworkFetchException(`Netowrk error during fetch: ${err}`);
  }

  if (response.ok || skipError(response.status)) {
    return response;
  }

  return new ExternalAPIException(
    `Response from API was not ok: ${response.status}`,
  );
};
