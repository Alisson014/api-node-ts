import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades UpdateById', () => {
    const email = "updatebyid-cidade@test.com";
    const password = "123456";
    let token = "";

    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });

        token = res.body.accessToken;
    });

    it('Atualizar Registro', async () => {
        await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Teste" });
        const res = await testServer.put('/cidades/1').set({ authorization: `Bearer ${token}` }).send({ nome: 'nome' });

        expect(res.status).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Atualizar Registro sem token de autorização', async () => {
        await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Teste" });
        const res = await testServer.put('/cidades/1').send({ nome: 'nome' });

        expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.put('/cidades/1.5').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.put('/cidades/test').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.put('/cidades/true').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.put('/cidades/-1').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.put('/cidades/0').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Nome inválido (menos que 3 caracteres)', async () => {
        const res = await testServer.put('/cidades/1').set({ authorization: `Bearer ${token}` }).send({ nome: 'n' });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });

    it('Nome em tipagem errada (object)', async () => {
        const res = await testServer.put('/cidades/1').set({ authorization: `Bearer ${token}` }).send({ nome: { nome: 'nome' } });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });

    it('Nome não fornecido', async () => {
        const res = await testServer.put('/cidades/1').set({ authorization: `Bearer ${token}` }).send({ nome: undefined });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
});