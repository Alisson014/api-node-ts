import { Router } from "express";
import { CidadesController } from "../../controllers/index.js";
import { ensureAuth } from "../../shared/middlewares/EnsureAuth.js";

const Cidadesrouter = Router();

Cidadesrouter.get('/', ensureAuth, CidadesController.getAllValidation, CidadesController.getAll);
Cidadesrouter.get('/:id', ensureAuth, CidadesController.getByIdValidation, CidadesController.getById);
Cidadesrouter.post('/', ensureAuth, CidadesController.createvalidation, CidadesController.create);
Cidadesrouter.put('/:id', ensureAuth, CidadesController.updateByIdValidation, CidadesController.updateById);
Cidadesrouter.delete('/:id', ensureAuth, CidadesController.deleteByIdValidation, CidadesController.deleteById);


export default Cidadesrouter;