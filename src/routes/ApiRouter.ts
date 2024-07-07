import { Request, Response, NextFunction, Router } from 'express';
import BaseRouter from './BaseRouter';
import routes from './ApiRoutes';
import * as middlewaresConfig from '../middlewares/middlewares.json';
import path from 'path';

class ApiRouter extends BaseRouter {
    constructor() {
        super();
        console.log('Reached ApiRouter constructor');
        this.initApiMiddlewares();
        this.initApiRoutes();
    }

    private initApiRoutes(): void {
        this.router.use('/api', routes);

        this.router.use('/api/*', (req: Request, res: Response) => {
            res.status(404).json({ message: 'Not Found' });
        });
    }

    private initApiMiddlewares(): void {
        console.log('Reached ApiRouter middleware initialization');
        const { api } = middlewaresConfig;
        if (api && Array.isArray(api)) {
            api.forEach((middlewarePath: string) => {
                const resolvedPath = path.resolve(__dirname, '..', middlewarePath);
                const middleware = require(resolvedPath).default;
                this.router.use((req: Request, res: Response, next: NextFunction) => {
                    middleware.handle(req, res, next);
                });
            });
        }
    }
}

export default new ApiRouter().router;
