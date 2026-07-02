const API_URL = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  token?: string,
): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = (await response.json()) as GraphQLResponse<T>;

  if (!response.ok || result.errors?.length) {
    throw new Error(result.errors?.[0]?.message || "GraphQL request failed");
  }

  return result.data as T;
}
