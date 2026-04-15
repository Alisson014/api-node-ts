import { Router } from "express";
import { PessoaController } from "../../controllers/pessoas";
import { ensureAuth } from "../../shared/middlewares";

const PessoaRouter = Router();


PessoaRouter.get('/', ensureAuth, PessoaController.getAllValidation, PessoaController.getAll);
PessoaRouter.get('/:id', ensureAuth, PessoaController.getByIdValidation, PessoaController.getById);
PessoaRouter.post('/', ensureAuth, PessoaController.createValidation, PessoaController.create);
PessoaRouter.put('/:id', ensureAuth, PessoaController.updateByIdValidation, PessoaController.updateById);
PessoaRouter.delete('/:id', ensureAuth, PessoaController.deleteByIdValidation, PessoaController.deleteById);

export default PessoaRouter;