import { Knex } from "../../knex";
import type { IPessoa } from "../../models";
import { ETableNames } from "../../ETableNames";

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error | undefined> => {
    try {
        const count = await Knex(ETableNames.cidade)
            .select()
            .where('id', '=', pessoa.cidadeId)
            .count('*', {as: 'count'});

        if (!count){
            throw new Error("Erro ao buscar cidade usada no cadastro não encontrada");
        }

        if (count[0]?.count === 0){
            throw new Error("Cidade usada no cadastro não foi encontrada");
        }

        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');

        if (typeof result === 'object'){
            return result.id;
        } else if (typeof result === 'number'){
            return result;
        }

        throw new Error("Erro ao criar registro");

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};