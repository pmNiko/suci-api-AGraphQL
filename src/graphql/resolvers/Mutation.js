import { tasks } from "../utils/tasks";
import invNum from "invoice-number";
import Order from "../../models/Order";
import Dish from "../../models/Dish";

export const Mutation = {
  createTask(_, { input }) {
    input._id = tasks.length;
    tasks.push(input);
    return input;
  },
  createOrder: async (_, { input }) => {
    let lastOrder = await Order.find({}).sort({ _id: -1 }).limit(1).lean();
    if (lastOrder.length != 0) {
      input.number = invNum.next(lastOrder[0].number);
    }
    return await new Order(input).save();
  },
  createDish: async (_, { input }) => {
    let dish = new Dish(input);
    return await dish.save();
  },
  addDishToOrder: async (_, { id_order, id_dish }) => {
    let order = await Order.findById(id_order).lean();
    let dish = await Dish.findById(id_dish).lean();

    dish._id = order.dishes.length.toString();
    delete dish.createdAt;
    delete dish.updatedAt;
    dish.state = "pending";

    let orderUpdate = await Order.findByIdAndUpdate(
      id_order,
      { $push: { dishes: dish } },
      {
        new: true,
      }
    );

    return orderUpdate;
  },
  dishReady: async (_, { id_order, dish_id }) => {
    let order = await Order.findOneAndUpdate(
      { _id: { $eq: id_order } },
      { $set: { "dishes.$[dish].state": "ready" } },
      {
        arrayFilters: [{ "dish._id": { $eq: dish_id } }],
        new: true,
      }
    );

    return order;
  },
};
