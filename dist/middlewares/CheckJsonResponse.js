"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonAcceptMiddleware {
    handle(req, res, next) {
        if (req.url.includes('/api/')) {
            const acceptHeader = req.headers['accept'];
            if (acceptHeader && acceptHeader.includes('application/json')) {
                next();
            }
            else {
                res.status(406).send('Not Acceptable');
            }
        }
    }
}
exports.default = new JsonAcceptMiddleware();
