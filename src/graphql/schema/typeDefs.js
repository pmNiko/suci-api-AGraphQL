import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    tasks: [Task]
    dishes: [Dish]
    orders: [Order]
    order(order_id: ID): Order
    tables: [Table]
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createDish(input: DishInput): Dish
    createOrder(table: Int): Order
    createTable(input: TableInput): Table
    closeOrder(order_id: ID): Order
    payOrder(order_id: ID): Order
    deleteOrder(order_id: ID): Order
    addDishToOrder(order_id: ID, dish_id: ID): Order
    popDishToOrder(order_id: ID, dish_id: ID): Order
    incrementDishToOrder(order_id: ID, dish_id: ID): Order
    decrementDishToOrder(order_id: ID, dish_id: ID): Order
    dishPending(order_id: ID, dish_id: ID): Order
    dishPreparing(order_id: ID, dish_id: ID): Order
    dishReady(order_id: ID, dish_id: ID): Order
    dishDelivered(order_id: ID, dish_id: ID): Order
    dishPendingToOrder(order_id: ID, dishes: [ID]): Order
    dishPreparingToOrder(order_id: ID, dishes: [ID]): Order
    dishReadyToOrder(order_id: ID, dishes: [ID]): Order
    dishDeliveredToOrder(order_id: ID, dishes: [ID]): Order
  }

  # ------ Table  -------- #
  type Table {
    _id: ID
    number: Int!
    color: String!
    free: Boolean
    order: ID
  }

  input TableInput {
    number: Int!
    color: String!
  }
  # ------ Dish  -------- #
  type Dish {
    _id: ID
    name: String
    price: Float
    category: String
    count: Int
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
    paid: Boolean
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
