import { tasks } from "../utils/tasks";
import Order from "../../models/Order";
import invNum from "invoice-number";

export const Mutation = {
  createTask(_, { input }) {
    input._id = tasks.length;
    tasks.push(input);
    console.log("paso por aca");
    return input;
  },
  createOrder: async (_, { input }) => {
    let lastOrder = await Order.find({}).sort({ _id: -1 }).limit(1).lean();
    if (lastOrder.length != 0) {
      input.invoice = invNum.next(lastOrder[0].invoice);
      // console.log("Este es el input: ", input);
    }

    let order = new Order(input);

    return await order.save();
  },
};
