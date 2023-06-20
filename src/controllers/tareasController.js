import Tarea from "../models/Tarea.js";

const tareasController = {
    getTareas: async(req, res) => {
        try {
            const tareas = await Tarea.findAll();
            return res.status(200).json(tareas);
        } catch (error) {
           return res.status(error.status || 500).json({msg: error.message || 'Hubo un error en el servidor.'});
        }
    },
    saveTarea: async(req, res) => {
        try {
            const tarea = req.body;
            if(!tarea){
                return res.status(400).json({msg: "No hay tarea"});
            }
            await Tarea.create(tarea);
            return res.status(201).json(tarea);
        } catch (error) {
            return res.status(error.status || 500).json({msg: error.message || 'Hubo un error en el servidor.'});
        }
        
    },
    updateTarea: async(req, res) => {
        try {
            const {id} = req.body;
            const tarea = await Tarea.findOne({where: {id}});
            if(!tarea){
                return res.status(400).json({msg: `La tarea con el id ${id} no existe`});
            }
            const tareaActualizada = await tarea.update(req.body);
            return res.status(200).json(tareaActualizada);
        } catch (error) {
            return res.status(error.status || 500).json({msg: error.message || 'Hubo un error en el servidor.'});
        }
       
    },
    deleteTarea: async(req, res) => {
        try {
            const {id} = req.params;
            const tarea = await Tarea.findOne({where: {id}});
            if(!tarea){
                return res.status(400).json({msg: `La tarea con el id ${id} no existe`});
            }
            await tarea.destroy();
            return res.status(200).json({msg: `Tarea ${id} eliminada`});
        } catch (error) {
            return res.status(error.status || 500).json({msg: error.message || 'Hubo un error en el servidor.'});
        }
        
    },
    getTarea: async(req, res) => {
        try {
            const { id } = req.params;
            const tarea = await Tarea.findOne({where: {id}});
            if(!tarea){
                return res.status(400).json({msg: `La tarea con el id ${id} no existe`});
            }
            return res.status(200).json(tarea);
        } catch (error) {
            return res.status(error.status || 500).json({msg: error.message || 'Hubo un error en el servidor.'});
        }
    },
}

export default tareasController;