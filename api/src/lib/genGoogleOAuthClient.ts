import { google } from "googleapis";
import type User from "@/data/models/User";
import GoogleAuth from "@/data/models/GoogleAuth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export default async function genGoogleOAuthClient(user?: User) {
  const googleOAuthClient = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
  );

  if (!user) {
    // eslint-disable-next-line no-console
    console.info("Google OAuth - No user provided - Returning base client");
    return googleOAuthClient;
  }

  // Should be preloaded
  const googleAuth = await user.getGoogleAuth();

  if (!googleAuth) {
    throw new Error("User has no google authentication");
  }

  const { accessToken, refreshToken } = googleAuth;

  googleOAuthClient.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  /**
   * If we don't have a refresh token, we can't rely on google client to
   * refresh itself. So we manually validate the token here and kick off
   * the user if the token is invalid for them to reauth manually.
   */
  if (!refreshToken) {
    try {
      await googleOAuthClient.getTokenInfo(accessToken);
    } catch (e) {
      throw new Error("User is unauthorized");
    }
  }

  // The googleOauthClient will automatically refresh tokens if they are out
  // of date. Set up a handler to update DB with new tokens if this happens.
  googleOAuthClient.on("tokens", (tokens) => {
    GoogleAuth.upsert({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      userId: user.id,
    });
  });

  return googleOAuthClient;
}
