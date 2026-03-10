import express from 'express';
import { router } from './routes/router';
import 'dotenv/config';

const app = express();


app.use(router);
app.use(express.json());


export { app };