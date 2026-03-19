import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { CidadesProvider } from "../../database/providers/cidades/index.js";


type QueryPropsType = {
    id: number | undefined,
    page: number | undefined,
    limit: number | undefined,
    filter?: string | undefined | null,
}
const queryValidation: yup.ObjectSchema<QueryPropsType> = yup.object().shape({
    id: yup.number().integer().optional().default(0),
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional(),
});


export const getAllValidation = validation({
    query: queryValidation,
});


export const getAll = async (req: Request<{}, {}, {}, QueryPropsType>, res: Response) => {
    const result = await CidadesProvider.getAll(req.query.page ?? 1, req.query.limit ?? 10, req.query.filter ?? "", Number(req.query.id));
    const count = await CidadesProvider.count(req.query.filter ?? "");

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    } else if (typeof result === 'undefined'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao buscar registros',
            }
        });
    }

    if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            }
        });
    } else if (typeof count === 'undefined'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao buscar quantidade de registros',
            }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-control-count');
    res.setHeader('x-control-count', count);

    return res.status(StatusCodes.OK).json(result);
};