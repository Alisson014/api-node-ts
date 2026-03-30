import * as yup from "yup";
import type { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/Pessoa";


export interface IQueryProps {
    page?: number | undefined,
    limit?: number | undefined,
    filter?: string | undefined | null,
}
const queryValidation: yup.ObjectSchema<IQueryProps> = yup.object().shape({
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional()
});

export const getAllValidation = validation({
    query: queryValidation,
});

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await PessoaProvider.getAll(req.query.page ?? 1, req.query.limit ?? 10, req.query.filter ?? "");
    const count = await PessoaProvider.count(req.query.filter ?? "");

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    } else if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-control-count');
    res.setHeader('x-control-count', Number(count));

    return res.status(StatusCodes.OK).json(result);
};