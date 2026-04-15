import * as yup from "yup";
import type { Request, Response } from "express";
import type { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";
import { JWTService, PasswordCrypto } from "../../shared/services";

export interface IBodyUsuario extends Omit<IUsuario, 'id' | 'nome'> { }

const bodyValidation: yup.ObjectSchema<IBodyUsuario> = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(6),
});

export const signInValidation = validation({
    body: bodyValidation,
});

export const signIn = async (req: Request<{}, {}, IBodyUsuario>, res: Response) => {
    const { email, senha } = req.body;

    const result = await UsuariosProvider.getByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos",
            }
        });
    }

    if (!result){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos",
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result!.senha);

    if (!passwordMatch) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos",
            }
        });
    } else {

        const accessToken = JWTService.sign({ uid: result.id });

        if (accessToken === "JWT_SECRET_NOT_FOUND"){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: "Erro ao gerar token de acesso",
                }
            }); 
        }

        return res.status(StatusCodes.OK).json({
            accessToken
        });
    }
};