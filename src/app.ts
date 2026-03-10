import { app } from "./server/Server";

const PORT = parseInt(process.env.PORT ?? "3000", 10);

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});