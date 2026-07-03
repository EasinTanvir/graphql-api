import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

export const API_URL =
  import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: API_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
