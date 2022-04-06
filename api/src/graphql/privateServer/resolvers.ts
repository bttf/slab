import { resolvers as scalarResolvers } from "graphql-scalars";
import { GraphQLFieldResolver } from "graphql";
import { Context } from "@/graphql/privateServer";

const viewer: GraphQLFieldResolver<null, Context, null> = (
  _source,
  _args,
  context
) => context.user;

export default {
  Query: { viewer },
  ...scalarResolvers,
};
