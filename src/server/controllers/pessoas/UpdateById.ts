import * as yup from "yup";
import type { Request, Response } from "express";
import type { IPessoa } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/Pessoa";

export interface IParams {
    id: number,
}
export interface IBodyProps extends Omit<IPessoa, 'id'> {
    nomeCompleto: string,
    email: string,
    cidadeId: number,
}

const paramsValidation: yup.ObjectSchema<IParams> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation :  yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().email().required(),
    cidadeId: yup.number().integer().required().moreThan(0),
});

export const updateByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});


export const updateById = async (req: Request<IParams, {}, IBodyProps>, res: Response) => {
    if (!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: "O id precisa ser informado"
            }
        });
    }

    const result = await PessoaProvider.updateById(req.params.id, req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};