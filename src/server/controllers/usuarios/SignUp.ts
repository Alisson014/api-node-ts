import * as yup from 'yup';
import type { IUsuario } from "../../database/models";
import { validation } from '../../shared/middlewares';
import { UsuariosProvider } from '../../database/providers/usuarios';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export interface IBodyUsuario extends Omit<IUsuario, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyUsuario> = yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required(),
    senha: yup.string().required().min(6),
});

export const signUpValidation = validation({
    body: bodyValidation,
});

export const signUp = async (req: Request<{}, {}, IBodyUsuario>, res: Response) => {
    const { email } = req.body;
    const is_existent = await UsuariosProvider.getByEmail(email);

    if (is_existent instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: is_existent.message
            }
        });
    }

    if (is_existent) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Email inválido"
            }
        });
    }
    
    const result = await UsuariosProvider.create(req.body);


    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};