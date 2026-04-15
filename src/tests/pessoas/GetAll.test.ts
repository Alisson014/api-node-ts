import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Pessoas - GetAll', () => {
    const email = "getall-pessoa@test.com";
    const password = "123456";
    let token = "";
    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });
        token = res.body.accessToken;
    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        
        const resCidade = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Cidade" });
        await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "getall@jet.com", cidadeId: cidadeId });
        cidadeId = resCidade.body;
    });
    
    it('Buscar registros', async () => {
        await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "getall2@jet.com", cidadeId: cidadeId });
        const res1 = await testServer.get('/pessoas').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });
    
    it('Buscar registros sem token de autorização', async () => {
        await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "getall2@jet.com", cidadeId: cidadeId });
        const res1 = await testServer.get('/pessoas');

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
        
    });

    it('Propriedade query page válida', async () => {

        const res1 = await testServer.get('/pessoas?page=10').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query page não positiva', async () => {

        const res1 = await testServer.get('/pessoas?page=0').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page não inteira', async () => {

        const res1 = await testServer.get('/pessoas?page=0.5').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query page com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/pessoas?page=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
        
    });

    it('Propriedade query limit válida', async () => {

        const res1 = await testServer.get('/pessoas?limit=10').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });

    it('Propriedade query limit não positiva', async () => {

        const res1 = await testServer.get('/pessoas?limit=0').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit não inteira', async () => {

        const res1 = await testServer.get('/pessoas?limit=0.5').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query limit com tipo inválido (string)', async () => {

        const res1 = await testServer.get('/pessoas?limit=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.limit');
        
    });

    it('Propriedade query filter válida', async () => {

        const res1 = await testServer.get('/pessoas?filter=string').set({ authorization: `Bearer ${token}` });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThanOrEqual(0);
        
    });
});