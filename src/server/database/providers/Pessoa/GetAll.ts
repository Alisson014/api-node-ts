import { Knex } from "../../knex";
import type { IPessoa } from "../../models";
import { ETableNames } from "../../ETableNames";


export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[]| Error | undefined> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select()
            .whereLike('nomeCompleto', 'like', `%${filter}%`)
            .orWhereILike('email', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (result) return result;

        throw new Error("Erro ao buscar registros");

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};