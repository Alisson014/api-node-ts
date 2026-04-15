import express from 'express';
import { router } from '../routes/router.js';
import cors from "cors";
import 'dotenv/config';
import './services/TranslationsYup.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_HOST,
}));

app.use(router);


export { app };