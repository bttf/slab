import express, { Request, Response } from "express";
import http from "http";
import { genApolloServer as genPrivateGqlServer } from "./graphql/privateServer";
import { genApolloServer as genPublicServer } from "./graphql/publicServer";

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const privateGqlServer = await genPrivateGqlServer(httpServer);
  const publicGqlServer = await genPublicServer(httpServer);

  await privateGqlServer.start();
  await publicGqlServer.start();

  privateGqlServer.applyMiddleware({ app, path: "/graphql" });
  publicGqlServer.applyMiddleware({ app, path: "/public/graphql" });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${publicGqlServer.graphqlPath}`
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${privateGqlServer.graphqlPath}`
  );
}

start();
