import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { CidadesProvider } from "../../database/providers/cidades/index.js";


type ParamsType = {
    id: number,
}
const paramsValidation: yup.ObjectSchema<ParamsType> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});


export const deleteByIdValidation = validation({
    params: paramsValidation,
});


export const deleteById = async (req: Request<ParamsType>, res: Response) => {
    if (!req.params.id){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'O parâmetro id é obrigatório',
            }
        });
    }

    const result = await CidadesProvider.deleteById(req.params.id);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};