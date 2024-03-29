import express, { Express } from 'express';


export default function configureServer(): Express {
    const app: Express = express();

    // Routes go here

    return app;
}