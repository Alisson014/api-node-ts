import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Pessoas - GetAll', () => {
    let cidadeId: number | undefined = undefined;
    
    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades').send({ nome: "Cidade" });
        await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "getall@jet.com", cidadeId: cidadeId });
        cidadeId = resCidade.body;
    });
    
    it('Buscar registros', async () => {
        await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "getall2@jet.com", cidadeId: cidadeId });
        const res1 = await testServer.get('/pessoas');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page válida', async () => {

        const res1 = await testServer.get('/pessoas?page=10');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page não positiva', async () => {

        const res1 = await testServer.get('/pessoas?page=0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page não inteira', async () => {

        const res1 = await testServer.get('/pessoas?page=0.5');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/pessoas?page=string');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query limit válida', async () => {

        const res1 = await testServer.get('/pessoas?limit=10');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query limit não positiva', async () => {

        const res1 = await testServer.get('/pessoas?limit=0');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit não inteira', async () => {

        const res1 = await testServer.get('/pessoas?limit=0.5');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/pessoas?limit=string');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query filter válida', async () => {

        const res1 = await testServer.get('/pessoas?filter=string');

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });
});