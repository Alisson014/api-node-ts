import { ETableNames } from "../../ETableNames";
import type { IUsuario } from "../../models";
import { Knex } from "../../knex";
import { PasswordCrypto } from "../../../shared/services";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error | undefined> => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

        const [result] = await Knex(ETableNames.usuario).insert({...usuario, senha: hashedPassword}).returning('id');

        if (typeof result === "object"){
            return result.id;
        } else if (typeof result === "number"){
            return result;
        }

        return new Error("Erro ao cadastrar o registro");
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};