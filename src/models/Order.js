/*
    Este modulo crea un modelo de datos que será 
    posteriormente guardado o consultado a la BD,
    a través de la definición de un Schema.
*/
import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  table: {
    type: Number,
    required: true,
  },
});
