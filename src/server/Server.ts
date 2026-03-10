import express from 'express';
import { router } from './routes/router';
const app = express();


app.use(router);
app.use(express.json());


export { app };