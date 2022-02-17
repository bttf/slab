import { google } from "googleapis";
import type { GraphQLFieldResolver } from "graphql";
import { PublicServerContext } from "../..";

const authWithGoogle: GraphQLFieldResolver<
  null,
  PublicServerContext,
  {
    code: string;
  }
> = async (_source, args, context) => {
  const { code } = args;
  const { googleOAuthClient } = context;
  const { tokens } = await googleOAuthClient.getToken(code);

  googleOAuthClient.setCredentials(tokens);

  const { access_token, refresh_token, id_token } = tokens;

  console.log("DEUBG", id_token);

  return 'testing';
};

export default authWithGoogle;
