import supertest from 'supertest';
import { app } from '../server/shared/Server.js';

export const testServer = supertest(app);