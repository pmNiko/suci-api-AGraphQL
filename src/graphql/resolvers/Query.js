import { tasks } from "../utils/tasks";
import Order from "../../models/Order";
import Dish from "../../models/Dish";
import Table from "../../models/Table";

export const Query = {
  tasks: () => tasks,
  dishes: async () => await Dish.find().lean(),
  orders: async () => await Order.find().lean(),
  order: async (_, { order_id }) => await Order.findById(order_id).lean(),
  tables: async () => await Table.find().lean(),
};
