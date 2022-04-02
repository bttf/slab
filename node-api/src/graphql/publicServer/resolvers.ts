import authWithGoogle from "./mutation/authWithGoogle";

import googleAuthUrl from "./query/googleAuthUrl";

export default {
  Mutation: {
    authWithGoogle,
  },
  Query: {
    googleAuthUrl,
  },
};
