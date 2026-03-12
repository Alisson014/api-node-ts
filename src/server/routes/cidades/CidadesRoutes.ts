import { Router } from "express";

import { CidadesController } from "../../controllers/index.js";


const Cidadesrouter = Router();


Cidadesrouter.get('/', CidadesController.getAllValidation, CidadesController.getAll);
Cidadesrouter.get('/:id', CidadesController.getByIdValidation, CidadesController.getById);
Cidadesrouter.post('/', CidadesController.createvalidation, CidadesController.create);
Cidadesrouter.put('/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
Cidadesrouter.delete('/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);


export default Cidadesrouter;