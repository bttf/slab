import jwt from "jsonwebtoken";
import { Strategy } from "passport-http-bearer";

const { AUTH_SECRET = "", NODE_ENV } = process.env;

export default new Strategy((token, done) => {
  if (NODE_ENV === "development" && token === "gen-types-token") {
    return done(null, {});
  }

  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) return done(err);
    return done(null, decoded);
  });
});
