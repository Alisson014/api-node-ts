import { Knex } from "../../knex";
import type { IPessoa } from "../../models";
import { ETableNames } from "../../ETableNames";


export const getById = async (id: number): Promise<IPessoa | Error | undefined > => {
    try {
        const result = await Knex(ETableNames.pessoa).select().where('id', '=', id).first();

        if (result) return result;

        throw new Error("Registro não encontrado");

    } catch (e: unknown) {
        if(e instanceof Error){
            console.error(e);
            return e;
        }
    }
};