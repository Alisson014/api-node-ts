import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import type { ICidade } from "../../database/models/Cidade.js";


interface CidadeBodyType extends Omit<ICidade, 'id'> {
    nome: string,
}
const bodyValidation: yup.ObjectSchema<CidadeBodyType> = yup.object().shape({
    nome: yup.string().required().min(3)
});


export const createvalidation = validation({
    body: bodyValidation,
});


export const create = async (req: Request<{}, {}, CidadeBodyType>, res: Response) => {
    console.log(req.body);

    res.status(StatusCodes.CREATED).json(1);
};