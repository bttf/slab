import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useMutation, publicClient } from "@/lib/graphql";
import { storeAccessToken } from "@/lib/storage";
import {
  AuthWithGoogleMutation,
  AuthWithGoogleMutationVariables,
} from "@/types";

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
    if (!authWithGoogle || !code || !router) return;

    const fetchToken = async () => {
      try {
        const resp = await authWithGoogle({
          variables: { code: code.toString() },
        });

        const token = resp.data?.authWithGoogle;

        if (!token) throw new Error("null token");

        storeAccessToken(token);

        router.push("/dashboard");
      } catch (e) {
        console.error("An error occurred", e);
        router.push(
          `/?error=${window.encodeURIComponent(
            "There was an error authenticating the user"
          )}`
        );
      }
    };

    fetchToken();
  }, [router, authWithGoogle, code]);

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
