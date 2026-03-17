import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";


type QueryPropsType = {
    page: number | undefined,
    limit: number | undefined,
    filter?: string | undefined | null,
}
const queryValidation: yup.ObjectSchema<QueryPropsType> = yup.object().shape({
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional(),
});


export const getAllValidation = validation({
    query: queryValidation,
});


export const getAll = async (req: Request<{}, {}, {}>, res: Response) => {
    console.log(req.query);
    console.log(req.query.limit);

    return res.status(StatusCodes.OK).json([{ id: 1, nome: "Nome" }, { id: 1, nome: "Nome" },]);
};