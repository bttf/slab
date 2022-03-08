import express from "express";
import http from "http";
import cors from 'cors';
import passport from "./lib/passport";
import { genApolloServer as genPrivateGqlServer } from "./graphql/privateServer";
import { genApolloServer as genPublicServer } from "./graphql/publicServer";

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const privateGqlServer = await genPrivateGqlServer(httpServer);
  const publicGqlServer = await genPublicServer(httpServer);

  // TODO Opt-in for CORS
  app.use(cors());

  await privateGqlServer.start();
  await publicGqlServer.start();

  publicGqlServer.applyMiddleware({ app, path: "/public/graphql" });

  app.use(passport.initialize());
  app.use(passport.authenticate("bearer", { session: false }));

  privateGqlServer.applyMiddleware({ app, path: "/graphql" });

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
