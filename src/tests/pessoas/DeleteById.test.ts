import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas DeleteById', () => {
    
    const email = "delete-pessoa@test.com";
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
        const result = await testServer.post('/pessoas').set({ authorization: `Bearer ${token}` }).send({ nomeCompleto: "Nome completo", email: "deletebyid@jet.com", cidadeId: cidadeId });
        pessoaId = result.body;
    });
    
    it('Deletar Registro sem token de autoziração', async () => {
        const res = await testServer.delete(`/pessoas/${pessoaId}`);
        
        expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Deletar Registro', async () => {
        const res = await testServer.delete(`/pessoas/${pessoaId}`).set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Deletar registro inexistente', async () => {
        const res = await testServer.delete('/pessoas/99999999').set({ authorization: `Bearer ${token}` });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.delete('/pessoas/1.5').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.delete('/pessoas/test').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.delete('/pessoas/true').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.delete('/pessoas/-1').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.delete('/pessoas/0').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });
});