import express from 'express';
import { Router, Request, Response } from 'express';

export const optionsRouter: Router = express.Router();

optionsRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

