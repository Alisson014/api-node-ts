import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import type { ICidade } from "../../database/models/Cidade.js";
import { CidadesProvider } from "../../database/providers/cidades/index.js";


export interface CidadeBodyType extends Omit<ICidade, 'id'> {
    nome: string,
}
const bodyValidation: yup.ObjectSchema<CidadeBodyType> = yup.object().shape({
    nome: yup.string().required().min(3).max(150)
});


export const createvalidation = validation({
    body: bodyValidation,
});


export const create = async (req: Request<{}, {}, CidadeBodyType>, res: Response) => {
    const result = await CidadesProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};