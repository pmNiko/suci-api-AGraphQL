import { tasks } from "../utils/tasks";
import Order from "../../models/Order";
import Dish from "../../models/Dish";
import Table from "../../models/Table";

export const Query = {
  tasks: () => tasks,
  dishes: async () => await Dish.find(),
  orders: async () => await Order.find(),
  order: async (_, { order_id }) => await Order.findById(order_id),
  tables: async () => await Table.find(),
};
