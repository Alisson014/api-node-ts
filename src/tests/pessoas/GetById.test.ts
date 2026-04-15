import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas GetById', () => {
    const email = "getbyid-pessoa@test.com";
    const password = "123456";
    let token = "";
    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });
        token = res.body.accessToken;
    });


    let cidadeId: number | undefined = undefined;
    let pessoaId: number | undefined = undefined;
    beforeAll(async () => {

        const resCidade = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Cidade" });
        cidadeId = resCidade.body;
        console.log("Id para cidade", cidadeId);
        
        const result = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "getbyid@jet.com", cidadeId: cidadeId });
        pessoaId = result.body;
    });

    it('Buscar Registro', async () => {
        const res = await testServer.get(`/pessoas/${pessoaId}`).set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('nomeCompleto');
    });
    
    it('Buscar Registro sem token de autorização', async () => {
        const res = await testServer.get(`/pessoas/${pessoaId}`);

        expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Deletar registro inexistente', async () => {
        const res = await testServer.get('/pessoas/99999999').set({ authorization: `Bearer ${token}` });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.get('/pessoas/1.5').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.get('/pessoas/test').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.get('/pessoas/true').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.get('/pessoas/-1').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.get('/pessoas/0').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });
});