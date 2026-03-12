import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";


type ParamsType = {
    id: number,
}
const paramsValidation: yup.ObjectSchema<ParamsType> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

type CidadeBodyType = {
    nome: string,
}
const bodyValidation: yup.ObjectSchema<CidadeBodyType> = yup.object().shape({
    nome: yup.string().required().min(3),
});


export const updateByIdValidation = validation({
    params: paramsValidation,
    body: bodyValidation,
});


export const updateById = async (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.NOT_FOUND).send("Não implementado");
};