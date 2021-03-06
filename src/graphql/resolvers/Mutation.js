import { tasks } from "../utils/tasks";
import invNum from "invoice-number";
import Order from "../../models/Order";
import Dish from "../../models/Dish";
import Table from "../../models/Table";

export const Mutation = {
  // mutación de prueba
  createTask(_, { input }) {
    input._id = tasks.length;
    tasks.push(input);
    return input;
  },
  // ----- Mutación para instamciar un Mesa ---- //
  createTable: async (_, { input }) => {
    let table = new Table(input);
    return await table.save();
  },
  // ----- Mutación para instamciar una comanda ---- //
  createOrder: async (_, { table }) => {
    let input = { table };
    let lastOrder = await Order.find({}).sort({ _id: -1 }).limit(1).lean();
    if (lastOrder.length != 0) {
      input.number = invNum.next(lastOrder[0].number);
    }
    let order = await new Order(input).save();

    await Table.findOneAndUpdate(
      { number: { $eq: table } },
      { $set: { order: order._id, free: false } },
      { new: true }
    );
    return order;
  },
  // ----- Mutación para cerrar una comanda ---- //
  closeOrder: async (_, { order_id }) => {
    let order = await Order.findOneAndUpdate(
      { _id: { $eq: order_id } },
      { $set: { closed: true } },
      { new: true }
    );
    resetTable(order);
    return order;
  },
  // ----- Mutación para pagar una comanda ---- //
  payOrder: async (_, { order_id }) => {
    let order = await Order.findOneAndUpdate(
      { _id: { $eq: order_id } },
      { $set: { paid: true } },
      { new: true }
    );
    return order;
  },
  // ----- Mutación para eliminar una comanda ---- //
  deleteOrder: async (_, { order_id }) => {
    let order = await Order.findByIdAndDelete(order_id);
    resetTable(order);
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
    let dishes = order.dishes;

    if (dishes.length === 0) {
      dish._id = "0";
    } else {
      dish._id = invNum.next(dishes[dishes.length - 1]._id);
    }

    delete dish.createdAt;
    delete dish.updatedAt;
    dish.state = "pending";
    dish.count = 1;

    let orderUpdate = await Order.findByIdAndUpdate(
      order_id,
      { $push: { dishes: dish } },
      {
        new: true,
      }
    );

    return orderUpdate;
  },
  // ----- Mutación para quitar un plato a una comanda ---- //
  popDishToOrder: async (_, { order_id, dish_id }) => {
    let orderUpdate = await Order.findOneAndUpdate(
      { _id: order_id },
      { $pull: { dishes: { _id: dish_id } } },
      { new: true }
    );

    return orderUpdate;
  },
  // ----- Mutación para incrementar un plato en una comanda ---- //
  incrementDishToOrder: async (_, { order_id, dish_id }) => {
    let order = await Order.findOneAndUpdate(
      { _id: { $eq: order_id } },
      { $inc: { "dishes.$[dish].count": 1 } },
      {
        arrayFilters: [{ "dish._id": { $eq: dish_id } }],
        new: true,
      }
    );

    return order;
  },
  // ----- Mutación para decrementar un plato en una comanda ---- //
  decrementDishToOrder: async (_, { order_id, dish_id }) => {
    let order = await Order.findOneAndUpdate(
      { _id: { $eq: order_id } },
      { $inc: { "dishes.$[dish].count": -1 } },
      {
        arrayFilters: [{ "dish._id": { $eq: dish_id } }],
        new: true,
      }
    );

    return order;
  },
  // ----- Mutación para cambiar el estado un plato ---- //
  dishPending: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "pending");
  },
  dishPreparing: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "preparing");
  },
  dishReady: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "ready");
  },
  dishDelivered: async (_, { order_id, dish_id }) => {
    return changeStateDish(order_id, dish_id, "delivered");
  },
  // ----- Mutación para cambiar el estado de multiples platos de una comanda ---- //
  dishPendingToOrder: async (_, { order_id, dishes }) => {
    let order = {};
    dishes.map((ele) => {
      order = changeStateDish(order_id, ele, "pending");
    });
    return order;
  },
  dishPreparingToOrder: async (_, { order_id, dishes }) => {
    let order = {};
    dishes.map((ele) => {
      order = changeStateDish(order_id, ele, "preparing");
    });
    return order;
  },
  dishReadyToOrder: async (_, { order_id, dishes }) => {
    let order = {};
    dishes.map((ele) => {
      order = changeStateDish(order_id, ele, "ready");
    });
    return order;
  },
  dishDeliveredToOrder: async (_, { order_id, dishes }) => {
    let order = {};
    dishes.map((ele) => {
      order = changeStateDish(order_id, ele, "delivered");
    });
    return order;
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

/*
  Función para liberar una mesa
*/
async function resetTable(order) {
  // Primero borra la order contenida de sus atributos
  await Table.findOneAndUpdate(
    { number: { $eq: order.table } },
    { $unset: { order } },
    { new: true }
  );
  // Por ultimo cambia su estado y la deja libre
  await Table.findOneAndUpdate(
    { number: { $eq: order.table } },
    { $set: { free: true } },
    { new: true }
  );
}
