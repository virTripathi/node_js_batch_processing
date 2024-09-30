import { Request, Response, NextFunction, Router } from 'express';
import * as middlewaresConfig from '../middlewares/middlewares.json';
import path from 'path';
import FileUploadRequest from '../requests/FileUploadRequest';
import FileUploadController from '../controllers/API/FileUploadController';

class ApiRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initApiMiddlewares();
        this.initApiRoutes();
    }

    private initApiRoutes(): void {
        this.router.get('/', (req, res) => {
            res.json({ message: 'Hello from api routes!' });
        });

        this.router.post(
            '/v1/file-upload',
            (req, res, next) => FileUploadRequest.handle(req, res, next),
            (req, res) => {
                return FileUploadController.save(req,res);
            }
        );
    }

    private initApiMiddlewares(): void {
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
