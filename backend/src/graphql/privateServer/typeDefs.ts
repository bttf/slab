import { gql } from "apollo-server-express";

export default gql`
  type Query {
    "test"
    hello: String
  }
`;
