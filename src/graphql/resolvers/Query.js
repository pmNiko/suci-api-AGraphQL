import { tasks } from "../utils/tasks";
import Order from "../../models/Order";

export const Query = {
  tasks: () => tasks,
  orders: async () => await Order.find(),
};
