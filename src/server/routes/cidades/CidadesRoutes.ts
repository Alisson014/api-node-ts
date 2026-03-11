import { Router } from "express";

import { CidadesController } from "../../controllers/index.js";


const Cidadesrouter = Router();


Cidadesrouter.post('/', CidadesController.createvalidation, CidadesController.create);


export default Cidadesrouter;