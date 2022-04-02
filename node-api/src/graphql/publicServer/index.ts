import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import type { Server } from "http";
import genGoogleOAuthClient from "../../lib/genGoogleOAuthClient";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const genContext = async () => ({
  googleOAuthClient: await genGoogleOAuthClient(),
});

export type PublicServerContext = Awaited<ReturnType<typeof genContext>>;

export const genApolloServer = async (httpServer: Server) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: await genContext(),
  });
