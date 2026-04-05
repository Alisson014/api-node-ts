import { Router } from "express";
import { UsuariosController } from "../../controllers";

const UsuariosRouter = Router();

UsuariosRouter.post('/signUp', UsuariosController.signUpValidation, UsuariosController.signUp);
UsuariosRouter.post('/signIn', UsuariosController.signInValidation, UsuariosController.signIn);

export default UsuariosRouter;