import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, client } from "lib/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
