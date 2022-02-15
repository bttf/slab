import express, { Request, Response } from "express";
import http from "http";
import { genApolloServer } from "./graphql";

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = genApolloServer(httpServer);

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
}

start();
