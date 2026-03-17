import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Cidades - Create', () => {
    
    it('Criar registo', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: "Teste" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });

    it('Registro com nome muito curto', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: "Te" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome não especificado', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: undefined });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome em tipagem inválida (number)', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });

    it('Registro com nome em tipagem inválida (object)', async () => {

        const res1 = await testServer.post('/cidades').send({ nome: { nome: "nome"} });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        
    });
});