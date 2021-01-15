import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    tasks: [Task]
  }

  # Definición del tipo Task
  type Task {
    _id: ID!
    title: String!
    description: String!
    number: Int
  }
`;

export default typeDefs;
