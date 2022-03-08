import jwt from "jsonwebtoken";
import { Strategy } from "passport-http-bearer";

const { AUTH_SECRET = "" } = process.env;

export default new Strategy((token, done) => {
  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) done(err);
    done(null, decoded);
  });
});
