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


export const getByIdValidation = validation({
    params: paramsValidation,
});


export const getById = async (req: Request, res: Response) => {
    console.log(req.params);

    return res.status(StatusCodes.NOT_FOUND).send("Não implementado");
};