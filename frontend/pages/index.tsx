import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { publicClient, gql } from "lib/graphql";
import styles from "../styles/Home.module.css";
import { GoogleAuthUrlQuery } from "./__generated__/index.types";

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
    <div className={styles.container}>
      <Head>
        <title>cool title goes here</title>
        <meta
          name="description"
          content="a cool web app with a solid foundation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {error && <div>{error}</div>}
        <h1 className={styles.title}>
          <a href={googleAuthUrl}>Log into Google</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
