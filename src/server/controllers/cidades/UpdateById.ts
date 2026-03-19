import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import type { ICidade } from "../../database/models/Cidade.js";
import { CidadesProvider } from "../../database/providers/cidades/index.js";


type ParamsType = {
    id: number,
}
const paramsValidation: yup.ObjectSchema<ParamsType> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

interface CidadeBodyType extends Omit<ICidade, 'id'> {
    nome: string,
}
const bodyValidation: yup.ObjectSchema<CidadeBodyType> = yup.object().shape({
    nome: yup.string().required().min(3).max(150),
});


export const updateByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});


export const updateById = async (req: Request<ParamsType, {}, CidadeBodyType>, res: Response) => {
    if (!req.params.id){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'O parâmetro id é obrigatório',
            }
        });
    }

    const result = await CidadesProvider.updateById({id: req.params.id, nome: req.body.nome});

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    };

    return res.status(StatusCodes.OK).json(result);
};