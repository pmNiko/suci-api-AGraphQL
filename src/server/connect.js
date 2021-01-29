/*
  --- Conexión a la Base de Datos Mongo ---
*/
import mongoose from "mongoose";

export async function connect() {
  await mongoose
    .connect(
      "mongodb+srv://Niko:FySckxBna3b2ThV@cluster0.b2dnz.mongodb.net/suci?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then((db) => console.log(">>>> Database is connected!"))
    .catch((err) => console.log(">>> Error: ", err));
}
