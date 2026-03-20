import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";


export const count = async (filter: string) : Promise<number | Error | undefined> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select()
            .whereLike('nomeCompleto', 'like', `%${filter}%`)
            .orWhereLike('email', 'like', `%${filter}%`)
            .count('*', {as: 'count'});

        if (Number.isInteger(Number(result[0]?.count))) return Number(result[0]?.count);

        throw new Error("Erro ao consultar quantidade de registros");
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};