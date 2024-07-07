"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonAcceptMiddleware {
    handle(req, res, next) {
        if (req.baseUrl.includes('/api')) {
            const acceptHeader = req.headers['accept'];
            if (acceptHeader && acceptHeader.includes('application/json')) {
                next();
            }
            else {
                res.status(406).json({ message: 'Not Acceptable' });
            }
        }
        else {
            next();
        }
    }
}
exports.default = new JsonAcceptMiddleware();
