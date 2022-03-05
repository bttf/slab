import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useMutation, publicClient } from "../graphql";

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
  const [authWithGoogle] = useMutation(AUTH_WITH_GOOGLE, {
    client: publicClient,
  });

  useEffect(() => {
    if (!authWithGoogle || !code) return;
    console.log("code", code);
    authWithGoogle({
      variables: { code },
    });
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