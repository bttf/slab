import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ContextFunction,
} from "apollo-server-core";
import { Server } from "http";
import db from "@/data";
import type User from "@/data/models/User";
import genGoogleOAuthClient from "@/lib/genGoogleOAuthClient";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export type Context = {
  googleOAuthClient: Awaited<ReturnType<typeof genGoogleOAuthClient>>;
  user: User | null;
};

// TODO provide express request type
const genContext: ContextFunction<any, Promise<Context>> = async ({ req }) => ({
  googleOAuthClient: await genGoogleOAuthClient(),
  user: await db.User.findOne({ where: { email: req.user.email ?? "" } }),
});

export const genApolloServer = async (httpServer: Server) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: genContext,
  });
