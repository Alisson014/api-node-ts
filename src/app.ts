import { app } from "./server/Server";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});