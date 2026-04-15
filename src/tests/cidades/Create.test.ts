import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Cidades - Create', () => {
    const email = "create-cidade@test.com";
    const password = "123456";
    let token = "";

    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Teste", email: email, senha: password});
        const res = await testServer.post("/usuarios/signIn").send({ email: email, senha: password });

        token = res.body.accessToken;
    });
    
    it('Criar registo', async () => {

        const res1 = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Teste" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });

    it('Criar registo sem token de acesso', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: "Teste" });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
        
    });

    it('Registro com nome muito curto', async () => {

        const res1 = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: "Te" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome não especificado', async () => {

        const res1 = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: undefined });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome em tipagem inválida (number)', async () => {

        const res1 = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome em tipagem inválida (object)', async () => {

        const res1 = await testServer.post('/cidades').set({ authorization: `Bearer ${token}` }).send({ nome: { nome: "nome"} });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });
});