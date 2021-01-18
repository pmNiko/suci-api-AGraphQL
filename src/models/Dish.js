/*
  Modelo Dish
*/
import mongoose from "mongoose";
var Float = require("mongoose-float").loadType(mongoose, 2);
import { Schema, model } from "mongoose";

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Float,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Dish", dishSchema);
