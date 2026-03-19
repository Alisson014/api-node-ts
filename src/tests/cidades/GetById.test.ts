import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades GetById', () => {

    it('Buscar Registro', async () => {
        await testServer.post('/cidades').send({ nome: "Teste" });
        const res = await testServer.get('/cidades/1');

        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('nome');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.get('/cidades/1.5');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.get('/cidades/test');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.get('/cidades/true');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.get('/cidades/-1');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.get('/cidades/0');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });
});