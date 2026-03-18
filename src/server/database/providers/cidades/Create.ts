import { Knex } from "../../knex";
import type { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";


export const create = async (cidade : Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
        const [result] =  await Knex(ETableNames.cidade).insert(cidade).returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if(typeof result === 'number') {
            return result;
        }

        return new Error("Erro ao cadastrar registro");
    } catch (e : unknown) {
        if(e instanceof Error){
            console.log(e);
            return e;
        }
    }
    return 1;
};