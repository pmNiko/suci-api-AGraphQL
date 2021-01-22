/*
    Este modulo Maneja el modelo de Tables
*/
import { Schema, model } from "mongoose";

const tableSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
      default: true,
    },
    order: String,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Table", tableSchema);
