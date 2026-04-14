import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuarios - SignUp", () => {
    it("Criar registro", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: "create@test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual("number");
    });

    it("Criar registro com nome inválido", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "No", email: "create2@test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nome");
    });
    
    it("Criar registro com email inválido", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: "create2 test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });
    
    it("Criar registro com senha inválida", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: "create3@test.com", senha: "12345" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.senha");
    });

    it("Criar registro com email duplicado", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: "create@test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty("errors.default");
    });

    it("Criar registro com nome não especificado", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ email: "create2@test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.nome");
    });
    
    it("Criar registro com email não especificado", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });
    
    it("Criar registro com senha não especificada", async () => {
        const res = await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: "create3@test.com" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.senha");
    });

});