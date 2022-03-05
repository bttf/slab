import { ApolloClient, InMemoryCache } from "@apollo/client";
export { ApolloProvider, gql, useQuery, useMutation } from "@apollo/client";

// server-side env vars
const PRIVATE_GRAPHQL_URI = process.env.PRIVATE_GRAPHQL_URI || "";
const PUBLIC_GRAPHQL_URI = process.env.PUBLIC_GRAPHQL_URI || "";

// client-side env vars
const NEXT_PUBLIC_PRIVATE_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_PRIVATE_GRAPHQL_URI || "";
const NEXT_PUBLIC_PUBLIC_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_PUBLIC_GRAPHQL_URI || "";

// private client
export const client = new ApolloClient({
  // env vars not prepended w/ 'next_public_' are not exposed to client-side JS app
  uri: PRIVATE_GRAPHQL_URI || NEXT_PUBLIC_PRIVATE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export const publicClient = new ApolloClient({
  // env vars not prepended w/ 'next_public_' are not exposed to client-side JS app
  uri: PUBLIC_GRAPHQL_URI || NEXT_PUBLIC_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});
