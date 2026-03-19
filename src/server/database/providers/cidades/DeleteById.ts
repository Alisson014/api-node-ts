import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";


export const deleteById = async (id: number): Promise<number | Error | undefined> => {
    try {
        const result:number = await Knex(ETableNames.cidade).delete().where('id', '=', id).returning('id');

        if (typeof result === 'undefined'){
            throw new Error('Erro ao deletar registro');
        }

        if (result > 0) return result;

        throw new Error("Erro ao deletar registro");
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};