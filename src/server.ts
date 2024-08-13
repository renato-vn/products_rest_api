import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
};

connectDB();

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
