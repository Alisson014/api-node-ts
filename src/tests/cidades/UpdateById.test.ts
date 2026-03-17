import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades UpdateById', () => {

    it('Atualizar Registro', async () => {
        const res = await testServer.put('/cidades/1').send({ nome: 'nome' });

        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('nome');
    });

    it('Id inválido (float)', async () => {
        const res = await testServer.put('/cidades/1.5');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (string)', async () => {
        const res = await testServer.put('/cidades/test');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (boolean)', async () => {
        const res = await testServer.put('/cidades/true');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (menor que zero)', async () => {
        const res = await testServer.put('/cidades/-1');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Id inválido (igual a zero)', async () => {
        const res = await testServer.put('/cidades/0');

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.params.id');
    });

    it('Nome inválido (menos que 3 caracteres)', async () => {
        const res = await testServer.put('/cidades/1').send({ nome: 'n' });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });

    it('Nome em tipagem errada (object)', async () => {
        const res = await testServer.put('/cidades/1').send({ nome: { nome: 'nome' } });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });

    it('Nome não fornecido', async () => {
        const res = await testServer.put('/cidades/1').send({ nome: undefined });

        expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    });
});