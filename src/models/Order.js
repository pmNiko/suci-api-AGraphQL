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
    number: {
      type: String,
      default: "ORD-000000",
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
    closed: {
      type: Boolean,
      default: false,
    },
    dishes: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", orderSchema);
