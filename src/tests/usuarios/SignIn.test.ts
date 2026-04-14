import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuarios - SignIn", () => {

    const userEmail : string = "signIn@test.com";
    const userSenha : string = "123456";
    beforeAll(async () => {
        await testServer.post("/usuarios/signUp").send({ nome: "Nome", email: userEmail, senha: userSenha });
    });

    it("Busca registro", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: userEmail, senha: userSenha });

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty("accessToken");
        expect(typeof res.body.accessToken).toEqual("string");
    });

    it("Buscar registro com email inválido", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: "signIn test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });
    
    it("Buscar registro com senha inválida", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: "signIn2@test.com", senha: "12345" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.senha");
    });

    it("Buscar registro com email não cadastrado", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: "fake@test.com", senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });
    
    it("Buscar registro com senha incorreta", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: userEmail, senha: "123456789" });

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toHaveProperty("errors.default");
    });

    it("Buscar registro com email não especificado", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ senha: "123456" });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.email");
    });
    
    it("Buscar registro com senha não especificada", async () => {
        const res = await testServer.post("/usuarios/signIn").send({ email: userEmail });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.body.senha");
    });
});