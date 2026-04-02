import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades').send({ nome: "Cidade" });
        cidadeId = resCidade.body;
        console.log("Id para cidade", cidadeId);
    });
    
    it('Criar registo', async () => {

        const res1 = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });

    it('Email duplicado', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Nome muito curto', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "No", email: "test2@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
    });

    it('Email inválido', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });

    it('CidadeId inválido', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test2@jet.com", cidadeId: 99999999999 });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Sem Nome', async () => {
        const res = await testServer.post('/pessoas').send({ email: "test2@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
    });

    it('Sem Email', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });

    it('Sem Cidade Id', async () => {
        const res = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "test2@jet.com" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.cidadeId");
    });

    it('Sem nenhuma propriedade', async () => {
        const res = await testServer.post('/pessoas').send();

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nomeCompleto");
        expect(res.body).toHaveProperty("errors.body.email");
        expect(res.body).toHaveProperty("errors.body.cidadeId");
    });
});