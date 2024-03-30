import express, { Express } from 'express';
import { optionsRouter } from './routes/options';

export default function configureServer(): Express {
    const app: Express = express();

    // Middleware go here
    app.use(express.json());

    // Routes go here
    app.use('/options', optionsRouter);

    return app;
}