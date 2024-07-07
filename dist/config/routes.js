"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Hello from routes!' });
});
router.get('/v1/file-upload', (req, res) => {
    res.json({ message: 'File upload API' });
});
// Add more routes as needed
exports.default = router;
