import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas UpdateById', () => {
    let cidadeId: number | undefined = undefined;
    let pessoaId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades').send({ nome: "Cidade" });
        cidadeId = resCidade.body;
        
        const result = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "byid@jet.com", cidadeId: cidadeId });
        pessoaId = result.body;
    });

    it('Atualizar Registro', async () => {
        const res = await testServer.put(`/pessoas/${pessoaId}`).send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res.status).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Atualizar registro inexistente', async () => {
        const res = await testServer.put('/pessoas/99999999').send({ nomeCompleto: "Nome completo", email: "test@jet.com", cidadeId: cidadeId });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.put('/pessoas/1.5');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.put('/pessoas/test');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.put('/pessoas/true');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.put('/pessoas/-1');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.put('/pessoas/0');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Atributos inválidos', async () => {
        const res = await testServer.put(`/pessoas/${pessoaId}`).send({ nomeCompleto: "No", email: "test", cidadeId: 0 });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nomeCompleto');
        expect(res.body).toHaveProperty('errors.body.email');
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Atributos não fornecidos', async () => {
        const res = await testServer.put(`/pessoas/${pessoaId}`).send({ nomeCompleto: undefined, email: undefined, cidadeId: undefined });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nomeCompleto');
        expect(res.body).toHaveProperty('errors.body.email');
        expect(res.body).toHaveProperty('errors.body.cidadeId');
    });
});