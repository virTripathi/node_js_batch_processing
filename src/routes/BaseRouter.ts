import { Request, Response, NextFunction, Router } from 'express';
import * as middlewaresConfig from '../middlewares/middlewares.json';
import path from 'path';

class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initMiddlewares();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.use('/', (req: Request, res: Response) => {
            res.status(404).json({ message: 'Not Found' });
        });
    }

    private initMiddlewares(): void {
        const { all } = middlewaresConfig;
        if (all && Array.isArray(all)) {
            all.forEach((middlewarePath: string) => {
                const resolvedPath = path.resolve(__dirname, '..', middlewarePath);
                const middleware = require(resolvedPath).default;
                this.router.use((req: Request, res: Response, next: NextFunction) => {
                    middleware.handle(req, res, next);
                });
            });
        }
    }
}

export default BaseRouter;
