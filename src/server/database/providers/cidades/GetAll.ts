import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import type { ICidade } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise<ICidade[] | Error | undefined> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .whereLike('nome', `%${filter}%`)
            .limit(Number(limit), { skipBinding: true })
            .offset((Number(page) - 1) * Number(limit));

        if (Number(id) > 0 && result && !result.find(r => r.id == Number(id))){
            const cidade = await Knex(ETableNames.cidade).select().where('id', '=', Number(id)).first();

            if (cidade) result.unshift(cidade);
        }
        

        if (!result || result == undefined){
            throw new Error("Erro ao buscar registros");
        }

        return result;

    } catch (e : unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};


export const count = async (filter: string): Promise<number | Error | undefined> => {
    try {
        const count= await Knex(ETableNames.cidade).select().whereLike('nome', `%${filter}%`).count('nome', { as: 'count' });
        
        if (Number.isInteger(count[0]?.count)) return Number(count[0]?.count);
        console.log(count);

        throw new Error("Erro ao consultar quantidade de registros");
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};