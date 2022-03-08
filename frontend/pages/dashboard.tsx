import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { DashboardQuery } from "./__generated__/dashboard.types";

const DASHBOARD_QUERY = gql`
  query Dashboard {
    viewer {
      uuid
      email
    }
  }
`;

const Dashboard: NextPage<any> = () => {
  const { data, loading } = useQuery<DashboardQuery>(DASHBOARD_QUERY);
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {data && (
        <>
          <h1>uuid: {data.viewer?.uuid}</h1>
          <h1>email: {data.viewer?.email}</h1>
        </>
      )}
    </div>
  );
};

export default Dashboard;
