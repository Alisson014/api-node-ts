import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Pessoas - Create', () => {
    const email = "create-pessoa@test.com";
    const password = "123456";
    let token = "";

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });
        token = res.body.accessToken;
        
        const resCidade = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Cidade" });
        cidadeId = resCidade.body;
    });
    
    it('Criar registo', async () => {

        const res1 = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });

    it('Criar registo sem token de autorização', async () => {

        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");        
    });

    it('Email duplicado', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Nome muito curto', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "No", email: "test2@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
    });

    it('Email inválido', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "test", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });

    it('CidadeId inválido', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "test2@jet.com", cidadeId: 99999999999 });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Sem Nome', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ email: "test2@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
    });

    it('Sem Email', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });

    it('Sem Cidade Id', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "test2@jet.com" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.cidadeId");
    });

    it('Sem nenhuma propriedade', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send();

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
        expect(res.body).toHaveProperty("errors.body.email");
        expect(res.body).toHaveProperty("errors.body.cidadeId");
    });
});