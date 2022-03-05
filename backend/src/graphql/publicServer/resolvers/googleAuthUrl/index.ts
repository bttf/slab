import type { GraphQLFieldResolver } from "graphql";
import type { PublicServerContext } from "../..";

const googleAuthUrl: GraphQLFieldResolver<null, PublicServerContext> = async (
  _source,
  _args,
  context
) => {
  return context.googleOAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: "email",
  });
};

export default googleAuthUrl;
