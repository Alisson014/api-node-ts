import { type Knex } from "knex";
// import path from 'path';


export const development : Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './database.sqlite',
    },
    migrations: {
        directory: './src/server/database/migrations',
    },
    seeds: {
        directory: './src/server/database/seeds',
    },
    pool: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: any) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        }
    }
};

export const test : Knex.Config = {
    ...development,
    connection: ':memory:',
};

export const production : Knex.Config = {
    ...development,
};