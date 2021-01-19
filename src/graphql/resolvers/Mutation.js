import { tasks } from "../utils/tasks";
import invNum from "invoice-number";
import Order from "../../models/Order";
import Dish from "../../models/Dish";

export const Mutation = {
  // mutación de prueba
  createTask(_, { input }) {
    input._id = tasks.length;
    tasks.push(input);
    return input;
  },
  // ----- Mutación para instamciar una comanda ---- //
  createOrder: async (_, { input }) => {
    let lastOrder = await Order.find({}).sort({ _id: -1 }).limit(1).lean();
    if (lastOrder.length != 0) {
      input.number = invNum.next(lastOrder[0].number);
    }
    return await new Order(input).save();
  },
  // ----- Mutación para cerrar una comanda ---- //
  closeOrder: async (_, { order_id }) => {
    let order = await Order.findByIdAndUpdate(
      order_id,
      { $set: { closed: true } },
      { new: true }
    );
    return order;
  },
  // ----- Mutación para eliminar una comanda ---- //
  deleteOrder: async (_, { order_id }) => {
    let order = await Order.findByIdAndDelete(order_id);
    return order;
  },
  // ----- Mutación para instamciar un plato ---- //
  createDish: async (_, { input }) => {
    let dish = new Dish(input);
    return await dish.save();
  },
  // ----- Mutación para cargar un plato a una comanda ---- //
  addDishToOrder: async (_, { order_id, dish_id }) => {
    let order = await Order.findById(order_id).lean();
    let dish = await Dish.findById(dish_id).lean();

    dish._id = order.dishes.length.toString();
    delete dish.createdAt;
    delete dish.updatedAt;
    dish.state = "pending";

    let orderUpdate = await Order.findByIdAndUpdate(
      order_id,
      { $push: { dishes: dish } },
      {
        new: true,
      }
    );

    return orderUpdate;
  },
  // ----- Mutación para cambiar el estado un plato ---- //
  dishPending: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "pending");
  },
  dishReady: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "ready");
  },
  dishDelivered: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "delivered");
  },
};

/*
  Función asincrona para acceder a un plato y cambiar su estado
*/
async function changeStateDish(order_id, dish_id, state) {
  let order = await Order.findOneAndUpdate(
    { _id: { $eq: order_id } },
    { $set: { "dishes.$[dish].state": state } },
    {
      arrayFilters: [{ "dish._id": { $eq: dish_id } }],
      new: true,
    }
  );

  return order;
}
