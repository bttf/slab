import googleAuthUrl from "./googleAuthUrl";
import authWithGoogle from "./mutations/authWithGoogle";

export default {
  Mutation: {
    authWithGoogle,
  },
  Query: {
    googleAuthUrl,
  },
};
