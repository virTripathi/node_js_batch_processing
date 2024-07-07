import { Request, Response, NextFunction } from 'express';

class JsonAcceptMiddleware {
    handle(req: Request, res: Response, next: NextFunction) {
        
        if (req.baseUrl.includes('/api')) {
            const acceptHeader = req.headers['accept'];
            if (acceptHeader && acceptHeader.includes('application/json')) {
                next();
            } else {
                res.status(406).json({message:'Not Acceptable'});
            }
        } else {
            next();
        }
    }
}

export default new JsonAcceptMiddleware();
