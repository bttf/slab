import { ApolloClient, InMemoryCache } from "@apollo/client";
export { ApolloProvider, gql, useQuery, useMutation } from "@apollo/client";

const PRIVATE_GRAPHQL_URI = process.env.PRIVATE_GRAPHQL_URI || "";
const PUBLIC_GRAPHQL_URI = process.env.PUBLIC_GRAPHQL_URI || "";

// private client
export const client = new ApolloClient({
  uri: PRIVATE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export const publicClient = new ApolloClient({
  uri: PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});
