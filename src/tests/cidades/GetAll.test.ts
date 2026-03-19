import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Cidades - GetAll', () => {
    
    it('Buscar registros', async () => {
        
        const res1 = await testServer.get('/cidades');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page válida', async () => {

        const res1 = await testServer.get('/cidades?page=10');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page não positiva', async () => {

        const res1 = await testServer.get('/cidades?page=0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page não inteira', async () => {

        const res1 = await testServer.get('/cidades?page=0.5');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/cidades?page=string');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query limit válida', async () => {

        const res1 = await testServer.get('/cidades?limit=10');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query limit não positiva', async () => {

        const res1 = await testServer.get('/cidades?limit=0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit não inteira', async () => {

        const res1 = await testServer.get('/cidades?limit=0.5');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/cidades?limit=string');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query filter válida', async () => {

        const res1 = await testServer.get('/cidades?filter=string');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });
});