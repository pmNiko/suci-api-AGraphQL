/*
    Este modulo crea un modelo de datos que será 
    posteriormente guardado o consultado a la BD,
    a través de la definición de un Schema.
*/
import { Schema, model } from "mongoose";
import date from "date-and-time";

const now = new Date();
const invDate = date.format(now, "DD/MM/YYYY");

const orderSchema = new Schema(
  {
    // generación con invoice-number invNum.next('2021/01/FAC001')
    invoice: {
      type: String,
      default: "FACT-000000",
    },
    // Fecha y Hora a travéz de date-and-time --save
    date: {
      type: String,
      default: invDate,
    },
    time: {
      type: String,
      default: date.format(now, "HH:mm"),
    },
    table: {
      type: Number,
      required: true,
    },
    pending: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// orderSchema.pre("save", async function (next) {
//   let lastOrder = await orderSchema.find({}).sort({ _id: -1 }).limit(1).lean();
//   let invoice = lastOrder[0].invoice;
//   console.log("Este: ", invoice);
//   if (invoice === undefined) {
//     fact = "FACT-000000";
//   } else {
//     fact = invoice;
//   }
//   next();
// });

export default model("Order", orderSchema);
