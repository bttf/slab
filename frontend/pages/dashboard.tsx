import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { TestQueryQuery } from "./__generated__/dashboard.types";

const TEST_QUERY = gql`
  query TestQuery {
    hello
  }
`;

const Dashboard: NextPage<any> = () => {
  const { data } = useQuery<TestQueryQuery>(TEST_QUERY);
  return (
    <div>
      Welcome brethren
      {data && <div>data: {data?.hello}</div>}
    </div>
  );
};

export default Dashboard;
