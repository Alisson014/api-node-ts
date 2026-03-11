import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import type { ObjectSchema, ValidationError } from "yup";

type fieldType = "body" | "header" | "params" | "query";

type AllSchemasType = Record<fieldType, ObjectSchema<object>>;

type ValidationType = ( schemas: Partial<AllSchemasType>) => RequestHandler;

export const validation: ValidationType = (schemas) => async (req, res, next) => {

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(( [key, schema] ) => {
        try {
            schema.validateSync(req[key as fieldType], { abortEarly: false });
            
        } catch (e) {
            const yupErrror = e as ValidationError;
            const errors: Record<string, string> = {};
            
            yupErrror.inner.forEach(error => {
                if (!error.path) return;
                errors[error.path] = error.message;
            });
            
            errorsResult[key as fieldType] = errors;    
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
        
    }
};