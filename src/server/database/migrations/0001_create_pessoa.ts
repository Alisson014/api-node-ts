import { type Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) : Promise<void> {
    return knex.schema.createTable(ETableNames.pessoa, table => {
        table.bigIncrements('id').primary().index();
        table.string('nomeCompleto').index().notNullable();
        table.string('email').unique().notNullable();
        
        table.bigInteger('cidadeIs').index().notNullable().references('id').inTable(ETableNames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');

        table.comment('Tabela usada para armazenar pessoas no sistema');
    }).then(() => {
        console.log(`# Create table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) : Promise<void> {
    return knex.schema.dropTable(ETableNames.pessoa). then(() => {
        console.log(`# Drop table ${ETableNames.pessoa}`);
    });
}