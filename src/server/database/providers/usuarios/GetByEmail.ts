import type { IUsuario } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const getByEmail = async (email: string): Promise<Error | IUsuario | undefined> => {
    try {
        const result = Knex(ETableNames.usuario).select('*').where('email', "=", email).first();

        if (result) return result;

        return new Error("Registro não encontrado");

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return new Error("Erro ao consultar registro");
        }
    }
};