import type { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";


type CidadeBodyType = {
    nome: string,
    estado: string,
}
const bodyValidation: yup.ObjectSchema<CidadeBodyType> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});


type CidadeQueryType = {
    filter: string | undefined,
}
const queryValidation: yup.ObjectSchema<CidadeQueryType> = yup.object().shape({
    filter: yup.string().min(3),
});


export const createvalidation = validation({
    body: bodyValidation,
    query: queryValidation,
});


export const create = async (req: Request<{}, {}, CidadeBodyType>, res: Response) => {
    console.log(req.body);
    console.log(req.query);

    res.send("Created");
};