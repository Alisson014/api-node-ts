import { Knex } from "../../knex";
import type { IPessoa } from "../../models";
import { ETableNames } from "../../ETableNames";


export const updateById = async (id:number, newPessoa: Omit<IPessoa, 'id'>): Promise<void | Error | undefined> => {
    try {
        const count = await Knex(ETableNames.cidade)
            .select()
            .where('id', '=', newPessoa.cidadeId)
            .count('*', {as: 'count'});

        if (!count){
            throw new Error("Erro ao buscar cidade usada no cadastro não encontrada");
        }

        if (count[0]?.count === 0){
            throw new Error("Cidade usada no cadastro não foi encontrada");
        }

        const result:number = await Knex(ETableNames.pessoa).update(newPessoa).where('id', '=', id).returning('id');

        if (result> 0) return;

        throw new Error("Erro ao atualizar registro");
        
    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};