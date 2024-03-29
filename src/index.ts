import { Express } from 'express';
import configureServer from './server';

const PORT: number | string = process.env.PORT || 3000;

(() => {
    try {
        const app: Express = configureServer();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})