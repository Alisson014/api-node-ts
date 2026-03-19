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


export const getByIdValidation = validation({
    params: paramsValidation,
});


export const getById = async (req: Request<ParamsType>, res: Response) => {
    const result = await CidadesProvider.getById(req.params.id);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    } else if (typeof result === 'undefined'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao buscar registro'
            }
        });
    }


    return res.status(StatusCodes.OK).json(result);
};