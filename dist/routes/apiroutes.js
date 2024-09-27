"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FileUploadRequest_1 = __importDefault(require("../requests/FileUploadRequest"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Hello from routes!' });
});
router.post('/v1/file-upload', (req, res, next) => FileUploadRequest_1.default.handle(req, res, next), (req, res) => {
    res.json({ message: 'File upload API' });
});
// Add more routes as needed
exports.default = router;
