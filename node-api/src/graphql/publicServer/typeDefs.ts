import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    authWithGoogle(code: String!): String
  }

  type Query {
    googleAuthUrl: String!
  }
`;
