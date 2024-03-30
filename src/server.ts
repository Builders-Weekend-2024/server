import express, { Express } from 'express';
import { optionsRouter } from './routes/options';
import { bookingsRouter } from './routes/bookings';

export default function configureServer(): Express {
    const app: Express = express();

    // Middleware go here
    app.use(express.json());

    // Routes go here
    app.use('/api/options', optionsRouter);
    app.use('/api/bookings', bookingsRouter);

    return app;
}