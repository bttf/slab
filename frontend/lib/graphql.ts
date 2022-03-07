import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "lib/storage";

export * from "@apollo/client";

// server-side env vars
const PRIVATE_GRAPHQL_URI = process.env.PRIVATE_GRAPHQL_URI || "";
const PUBLIC_GRAPHQL_URI = process.env.PUBLIC_GRAPHQL_URI || "";

// client-side env vars
const NEXT_PUBLIC_PRIVATE_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_PRIVATE_GRAPHQL_URI || "";
const NEXT_PUBLIC_PUBLIC_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_PUBLIC_GRAPHQL_URI || "";

export const publicClient = new ApolloClient({
  // env vars not prepended w/ 'next_public_' are not exposed to client-side JS app
  uri: PUBLIC_GRAPHQL_URI || NEXT_PUBLIC_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

// private client
const privateHttpLink = new HttpLink({
  // env vars not prepended w/ 'next_public_' are not exposed to client-side JS app
  uri: PRIVATE_GRAPHQL_URI || NEXT_PUBLIC_PRIVATE_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // TODO Catch 401s here and re-route to index
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, privateHttpLink]),
  cache: new InMemoryCache(),
});
