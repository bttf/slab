import authWithGoogle from "./_mutations/authWithGoogle";
import googleAuthUrl from "./googleAuthUrl";

export default {
  Mutation: {
    authWithGoogle,
  },
  Query: {
    googleAuthUrl,
  },
};
