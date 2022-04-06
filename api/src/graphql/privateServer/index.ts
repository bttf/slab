import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ContextFunction,
} from "apollo-server-core";
import { Server } from "http";
import db from "@/data";
import { genLoaders } from "@/data/dataloaders";
import type User from "@/data/models/User";
import genGoogleOAuthClient from "@/lib/genGoogleOAuthClient";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export type Context = {
  googleOAuthClient: Awaited<ReturnType<typeof genGoogleOAuthClient>>;
  user: User | null;
  loaders: ReturnType<typeof genLoaders>;
};

// TODO provide express request type
const genContext: ContextFunction<any, Promise<Context>> = async ({ req }) => {
  const user = await db.User.findOne({
    where: { email: req.user.email ?? "" },
  });

  if (!user) throw new Error("authenticated user not found in db");

  return {
    googleOAuthClient: await genGoogleOAuthClient(),
    user,
    loaders: genLoaders(user),
  };
};

export const genApolloServer = async (httpServer: Server) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: genContext,
  });
