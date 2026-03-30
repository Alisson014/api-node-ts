import * as yup from 'yup';
import type { Request, Response } from "express";
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { PessoaProvider } from '../../database/providers/Pessoa';

export interface IParams {
    id: number,
};
const paramsValidation: yup.ObjectSchema<IParams> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
});

export const getByIdValidation = validation({
    params: paramsValidation
});

export const getById = async (req: Request<IParams>, res: Response) => {
    if (!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: "O id precisa ser informado"
            }
        });
    }

    const result = await PessoaProvider.getById(req.params.id);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};