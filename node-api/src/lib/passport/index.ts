import passport from "passport";
import bearerStrategy from "./bearerStrategy";

passport.use(bearerStrategy);

export default passport;
