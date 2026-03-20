import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";


export const deleteById = async (id: number): Promise<void | Error | undefined> => {
    try {
        const result = await Knex(ETableNames.pessoa).delete().where('id', '=', id);

        if (result > 0) return;

        throw new Error("Erro ao deletar, registro não encontrado");

    } catch (e: unknown) {
        if (e instanceof Error){
            console.error(e);
            return e;
        }
    }
};