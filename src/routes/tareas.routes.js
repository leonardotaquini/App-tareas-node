import { Router } from "express";
import tareasController from "../controllers/tareasController.js";

const router = Router();
const {getTarea, getTareas, saveTarea, updateTarea, deleteTarea} = tareasController

//Rutas para el backend
router.get("/api/tarea/", getTareas);
router.get("/api/tarea/:id", getTarea);
router.post("/api/tarea/save", saveTarea);
router.put("/api/tarea/update", updateTarea);
router.delete("/api/tarea/delete/:id", deleteTarea);

//Rutas para las vistas

router.get('/', (req, res)=> {
    res.render('index');
});

export default router;