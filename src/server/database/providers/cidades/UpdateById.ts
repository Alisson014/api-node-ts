import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import type { ICidade } from "../../models";

export const updateById = async (cidade : ICidade): Promise<void | Error | undefined> => {
    try {
        const result:number = await Knex(ETableNames.cidade).update({ nome: cidade.nome }).where('id', '=', cidade.id).returning('id');

        if(typeof result === 'undefined'){
            throw new Error("Erro ao atualizar registro");
        }

        return;

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};