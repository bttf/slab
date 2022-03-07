import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useMutation, publicClient } from "../graphql";
import {
  AuthWithGoogleMutation,
  AuthWithGoogleMutationVariables,
} from "./__generated__/google.types";

const AUTH_WITH_GOOGLE = gql`
  mutation AuthWithGoogle($code: String!) {
    authWithGoogle(code: $code)
  }
`;

const GoogleAuth: NextPage = () => {
  const router = useRouter();
  const {
    query: { code },
  } = router;

  const [authWithGoogle] = useMutation<
    AuthWithGoogleMutation,
    AuthWithGoogleMutationVariables
  >(AUTH_WITH_GOOGLE, {
    client: publicClient,
  });

  useEffect(() => {
    if (!authWithGoogle || !code) return;
    const fetchToken = async () => {
      try {
        const resp = await authWithGoogle({
          variables: { code: code.toString() },
        });

        const token = resp.data?.authWithGoogle;

        // TODO store token
        // re-route to index
      } catch (e) {
        // TODO communicate error
        // re-route to login page
      }
    };

    fetchToken();
  }, [authWithGoogle, code]);

  return (
    <div>
      <h1>
        {" "}
        this is where we make a client-side request to graphql api using code
        provided in query params
      </h1>
    </div>
  );
};

export default GoogleAuth;
