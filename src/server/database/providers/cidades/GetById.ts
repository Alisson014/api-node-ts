import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import type { ICidade } from "../../models";



export const getById = async (id: number): Promise<ICidade | Error | undefined> => {
    try {
        const result = await Knex(ETableNames.cidade).select().where('id', '=', id).first();

        if (result) return result;

        throw new Error ("Registro não encontrado");

    } catch (e: unknown) {
        if(e instanceof Error) {
            console.error(e);
            return e;
        }
    }
};