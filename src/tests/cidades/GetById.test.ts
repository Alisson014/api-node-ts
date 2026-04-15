import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades GetById', () => {
    const email = "getbyid-cidade@test.com";
    const password = "123456";
    let token = "";

    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });

        token = res.body.accessToken;
    });

    it('Buscar Registro', async () => {
        await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Teste" });
        const res = await testServer.get('/cidades/1').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('nome');
    });

    it('Buscar Registro sem token de autorização', async () => {
        await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Teste" });
        const res = await testServer.get('/cidades/1');

        expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.get('/cidades/1.5').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.get('/cidades/test').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.get('/cidades/true').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.get('/cidades/-1').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.get('/cidades/0').set({ authorization: `Bearer ${token}` });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });
});