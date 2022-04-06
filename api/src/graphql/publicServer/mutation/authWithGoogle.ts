import type { GraphQLFieldResolver } from "graphql";
import jwt from "jsonwebtoken";
import db from "@/data";
import { PublicServerContext } from "@/graphql/publicServer";

type GoogleIDToken = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  iat: number;
  exp: number;
};

const { AUTH_SECRET } = process.env;

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

  if (!id_token) {
    throw new Error("Google did not give us an id_token");
  }

  const decodedIdToken = jwt.decode(id_token);

  if (!decodedIdToken) {
    throw new Error("ID token from Google was bunk");
  }

  const { email } = decodedIdToken as GoogleIDToken;

  if (!email) {
    throw new Error("email from Google was bunk");
  }

  const [user] = await db.User.findOrCreate({
    where: { email },
  });

  const [googleAuth, isGoogleAuthNew] = await db.GoogleAuth.findOrCreate({
    where: { userId: user.id },
    defaults: {
      accessToken: access_token,
      refreshToken: refresh_token,
    },
  });

  if (!isGoogleAuthNew) {
    // ignore refresh token since that is only given to us the very first time
    await googleAuth.update({ accessToken: access_token });
  }

  return jwt.sign(
    {
      email,
    },
    AUTH_SECRET || ""
  );
};

export default authWithGoogle;
