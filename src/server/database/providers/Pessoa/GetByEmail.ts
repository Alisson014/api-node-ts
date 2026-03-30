import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import type { IPessoa } from "../../models";

export const getByEmail = async (email: string) : Promise<IPessoa | Error | undefined> => {
    try {
        const result = Knex(ETableNames.pessoa).select().where('email', '=', email).first();

        return result;

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};