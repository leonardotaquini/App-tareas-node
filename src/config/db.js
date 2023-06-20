import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";
//Permite leer variables de entorno de la app.
config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

  //Funcion para conectarme a la db
  const conectDB = async() => {
    try {
        await sequelize.sync({ force:true });
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log(error.message);
    }
  }

  export {
    conectDB,
    sequelize,
    DataTypes,
  }