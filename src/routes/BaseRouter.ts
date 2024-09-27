import { Request, Response, NextFunction, Router } from 'express';
import * as middlewaresConfig from '../middlewares/middlewares.json';
import path from 'path';
import ApiRouter from './ApiRouter';

class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initMiddlewares();
        this.initApiRoutes(); // Corrected method call order
        this.handleMethodNotAllowed(); // Handle method not allowed
        this.handleNotFound(); // Handle route not found
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

    private initApiRoutes(): void {
        this.router.use('/api', ApiRouter);
    }

    private handleMethodNotAllowed(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Allow', 'GET, POST'); // Define allowed methods for your route
            if (req.method !== 'GET' && req.method !== 'POST') {
                res.status(405).json({ message: 'Method Not Allowed', allowedMethods: ['GET', 'POST'] });
            } else {
                next(); // Move to next middleware if method is allowed
            }
        });
    }

    private handleNotFound(): void {
        this.router.use('*', (req: Request, res: Response) => {
            res.status(404).json({ message: 'Route Not Found!' });
        });
    }
}

export default BaseRouter;
