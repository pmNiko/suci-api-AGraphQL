/*
  --- Conexión a la Base de Datos Mongo ---
*/
import mongoose from "mongoose";

export async function connect() {
  await mongoose
    .connect("mongodb://localhost/suci", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((db) => console.log(">>>> Database is connected!"))
    .catch((err) => console.log(">>> Error: ", err));
}
