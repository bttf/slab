import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import logOut from "@/lib/logOut";
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
        <div className="px-2">
          <h1>uuid: {data.viewer?.uuid}</h1>
          <h1>email: {data.viewer?.email}</h1>
          <button className="bg-slate-100 p-2 border" onClick={logOut}>
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
