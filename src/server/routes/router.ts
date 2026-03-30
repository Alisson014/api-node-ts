import { Router } from "express";
import { StatusCodes } from "http-status-codes";


import Cidadesrouter from "./cidades/CidadesRoutes.js";
import PessoaRouter from "./pessoas/PessoasRoutes.js";

const router = Router();


router.use('/cidades', Cidadesrouter);
router.use('/pessoas', PessoaRouter);

router.get('/', (req, res) => {
    return res.status(StatusCodes.OK).send("Raiz do projeto");
});



export { router };