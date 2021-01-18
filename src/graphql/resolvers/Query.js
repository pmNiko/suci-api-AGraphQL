import { tasks } from "../utils/tasks";
import Order from "../../models/Order";
import Dish from "../../models/Dish";

export const Query = {
  tasks: () => tasks,
  orders: async () => await Order.find(),
  dishes: async () => await Dish.find(),
};
