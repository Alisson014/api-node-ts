import supertest from 'supertest';
import { app } from '../server/shared/Server.js';
import { Knex } from '../server/database/knex/index.js';


beforeAll(async () => {
    await Knex.migrate.latest();
    await Knex.seed.run();
});

afterAll(async () => {
    await Knex.destroy();
});


export const testServer = supertest(app);