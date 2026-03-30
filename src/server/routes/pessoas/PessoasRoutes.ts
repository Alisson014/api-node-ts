import { Router } from "express";
import { PessoaController } from "../../controllers/pessoas";

const PessoaRouter = Router();


PessoaRouter.get('/', PessoaController.getAllValidation, PessoaController.getAll);
PessoaRouter.get('/:id', PessoaController.getByIdValidation, PessoaController.getById);
PessoaRouter.post('/', PessoaController.createValidation, PessoaController.create);
PessoaRouter.put('/:id', PessoaController.updateByIdValidation, PessoaController.updateById);
PessoaRouter.delete('/:id', PessoaController.deleteByIdValidation, PessoaController.deleteById);

export default PessoaRouter;