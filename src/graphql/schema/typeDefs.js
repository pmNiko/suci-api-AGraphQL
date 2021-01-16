import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    tasks: [Task]
    orders: [Order]
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createOrder(input: OrderInput): Order
  }

  # input Order
  input OrderInput {
    table: Int!
  }

  # Input task
  input TaskInput {
    title: String!
    description: String!
    number: Int
  }

  # Definición de Order
  type Order {
    _id: ID
    invoice: String
    date: String
    time: String
    table: Int
    pending: Boolean
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
