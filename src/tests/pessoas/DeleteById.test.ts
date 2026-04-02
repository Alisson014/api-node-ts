import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas DeleteById', () => {
    let cidadeId: number | undefined = undefined;
    let pessoaId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades').send({ nome: "Cidade" });
        cidadeId = resCidade.body;
        console.log("Id para cidade", cidadeId);
        
        const result = await testServer.post('/pessoas').send({ nomeCompleto: "Nome completo", email: "deletebyid@jet.com", cidadeId: cidadeId });
        pessoaId = result.body;
    });
    it('Deletar Registro', async () => {
        const res = await testServer.delete(`/pessoas/${pessoaId}`);

        expect(res.status).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Deletar registro inexistente', async () => {
        const res = await testServer.delete('/pessoas/99999999');

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.delete('/pessoas/1.5');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.delete('/pessoas/test');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.delete('/pessoas/true');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.delete('/pessoas/-1');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.delete('/pessoas/0');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });
});