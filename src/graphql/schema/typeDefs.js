import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    tasks: [Task]
    dishes: [Dish]
    orders: [Order]
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createDish(input: DishInput): Dish
    createOrder(input: OrderInput): Order
    closeOrder(order_id: ID): Order
    deleteOrder(order_id: ID): Order
    addDishToOrder(order_id: ID, dish_id: ID): Order
    popDishToOrder(order_id: ID, dish_id: ID): Order
    dishPending(order_id: ID, dish_id: ID): Order
    dishReady(order_id: ID, dish_id: ID): Order
    dishDelivered(order_id: ID, dish_id: ID): Order
  }

  # ------ Dish  -------- #
  type Dish {
    _id: ID
    name: String
    price: Float
    category: String
    state: String
  }

  input DishInput {
    name: String!
    price: Float!
    category: String!
  }

  # ------  Order  -------- #
  input OrderInput {
    table: Int!
  }
  # Definición de Order
  type Order {
    _id: ID
    number: String
    date: String
    time: String
    table: Int
    closed: Boolean
    dishes: [Dish]
  }

  # ------  Task  -------- #
  input TaskInput {
    title: String!
    description: String!
    number: Int
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
