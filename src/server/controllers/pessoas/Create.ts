import * as yup from 'yup';
import type { Request, Response } from "express";
import type { IPessoa } from "../../database/models";
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { PessoaProvider } from '../../database/providers/Pessoa';

export interface BodyPessoa extends Omit<IPessoa, 'id'> { }

const bodyValidation: yup.ObjectSchema<BodyPessoa> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().moreThan(0)
});

export const createValidation = validation({
    body: bodyValidation
});

export const create = async (req: Request<{}, {}, BodyPessoa>, res: Response) => {
    const existing = await PessoaProvider.getByEmail(req.body.email);
    
    if (existing instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: existing.message,
            }
        });
    }
    
    if (!(typeof existing === "undefined")){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Este email já foi cadastrado",
            }
        });
    }

    const result = await PessoaProvider.create(req.body);
    
    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};