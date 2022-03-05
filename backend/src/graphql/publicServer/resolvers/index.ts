import googleAuthUrl from "./googleAuthUrl";
import authWithGoogle from "./_mutations/authWithGoogle";

export default {
  Mutation: {
    authWithGoogle,
  },
  Query: {
    googleAuthUrl,
  },
};
