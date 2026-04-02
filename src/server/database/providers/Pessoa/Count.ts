import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";


export const count = async (filter: string) : Promise<number | Error | undefined> => {
    try {
        const count= await Knex(ETableNames.pessoa).select().whereLike('nomeCompleto', `%${filter}%`).count('nomeCompleto', { as: 'count' });
        
        if (Number.isInteger(count[0]?.count)) return Number(count[0]?.count);

        throw new Error("Erro ao consultar quantidade de registros");
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};