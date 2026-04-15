import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Cidades - GetAll', () => {
    const email = "getall-cidade@test.com";
    const password = "123456";
    let token = "";

    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });

        token = res.body.accessToken;
    });
    
    it('Buscar registros', async () => {
        
        const res1 = await testServer.get('/cidades').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Buscar registros sem token de autorização', async () => {
        
        const res = await testServer.get('/cidades');

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Propriedade query page válida', async () => {

        const res1 = await testServer.get('/cidades?page=10').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page não positiva', async () => {

        const res1 = await testServer.get('/cidades?page=0').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page não inteira', async () => {

        const res1 = await testServer.get('/cidades?page=0.5').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/cidades?page=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query limit válida', async () => {

        const res1 = await testServer.get('/cidades?limit=10').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query limit não positiva', async () => {

        const res1 = await testServer.get('/cidades?limit=0').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit não inteira', async () => {

        const res1 = await testServer.get('/cidades?limit=0.5').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/cidades?limit=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query filter válida', async () => {

        const res1 = await testServer.get('/cidades?filter=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });
});