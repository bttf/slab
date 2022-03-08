import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    uuid: UUID!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    viewer: User
  }
`;

export default [...scalarTypeDefs, typeDefs];
