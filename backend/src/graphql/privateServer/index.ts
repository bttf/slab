import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Server } from "http";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const genContext = () => ({});

export const genApolloServer = (httpServer: Server) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: genContext(),
  });
