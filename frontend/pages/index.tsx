import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { publicClient, gql } from "@/lib/graphql";
import { GoogleAuthUrlQuery } from "@/types";

export async function getServerSideProps() {
  const resp = await publicClient.query<GoogleAuthUrlQuery>({
    query: gql`
      query GoogleAuthUrl {
        googleAuthUrl
      }
    `,
  });

  return {
    props: {
      googleAuthUrl: resp.data.googleAuthUrl,
    },
  };
}

const Home: NextPage<{ googleAuthUrl: string }> = ({ googleAuthUrl }) => {
  const {
    query: { error },
  } = useRouter();

  return (
    <div>
      <Head>
        <title>cool title goes here</title>
        <meta
          name="description"
          content="a cool web app with a solid foundation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        {error && <div>{error}</div>}
        <a className="bg-slate-100 p-2 border" href={googleAuthUrl}>
          Log into Google
        </a>
      </main>
    </div>
  );
};

export default Home;
