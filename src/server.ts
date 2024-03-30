import express, { Express } from 'express';
import { optionsRouter, bookingsRouter, imagesRouter } from './routes/';

export default function configureServer(): Express {
    const app: Express = express();

    // Middleware go here
    app.use(express.json());

    // Routes go here
    app.use('/api/options', optionsRouter);
    app.use('/api/bookings', bookingsRouter);
    app.use('/api/images', imagesRouter);

    return app;
}