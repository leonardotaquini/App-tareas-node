import express from "express";
import tareasRouter from "./routes/tareas.routes.js";
import { conectDB } from "./config/db.js";
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

//Creo una instancia de express
const app = express();

//Configuracion ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());



//Configuracion del puerto
const PORT = process.env.PORT || 3000;

//Conecto con la db
conectDB();

//Configuracion de rutas
app.use(tareasRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});