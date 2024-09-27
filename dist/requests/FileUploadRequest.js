"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
const validator_1 = __importDefault(require("validator"));
const axios_1 = __importDefault(require("axios"));
class FileUploadRequest {
    constructor() {
        this.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
    }
    handle(req, res, next) {
        this.upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const requiredHeaders = ['s no', 'product name', 'input image urls'];
            const fileContent = req.file.buffer.toString();
            const stream = stream_1.Readable.from(fileContent);
            const rows = [];
            let headersValid = true;
            stream.pipe((0, csv_parser_1.default)())
                .on('headers', (headers) => {
                headersValid = requiredHeaders.every(header => headers.includes(header));
            })
                .on('data', (row) => {
                rows.push(row);
            })
                .on('end', async () => {
                if (!headersValid) {
                    return res.status(400).json({ message: 'Invalid CSV headers' });
                }
                const validationErrors = [];
                for (const [index, row] of rows.entries()) {
                    const rowIndex = index + 1;
                    if (!row['s no'] || isNaN(Number(row['s no']))) {
                        validationErrors.push(`Row ${rowIndex}: 's no' must be a number`);
                    }
                    if (!row['product name'] || typeof row['product name'] !== 'string') {
                        validationErrors.push(`Row ${rowIndex}: 'product name' must be a string`);
                    }
                    if (!row['input image urls'] || typeof row['input image urls'] !== 'string' || !validator_1.default.isURL(row['input image urls'])) {
                        validationErrors.push(`Row ${rowIndex}: 'input image urls' must be a valid URL`);
                    }
                    else {
                        try {
                            const response = await axios_1.default.head(row['input image urls']);
                            if (!response.headers['content-type'].startsWith('image/')) {
                                validationErrors.push(`Row ${rowIndex}: 'input image urls' must be a valid image URL`);
                            }
                        }
                        catch (error) {
                            validationErrors.push(`Row ${rowIndex}: 'input image urls' is not reachable or not an image`);
                        }
                    }
                }
                if (validationErrors.length > 0) {
                    return res.status(400).json({ message: 'CSV content validation failed', errors: validationErrors });
                }
                // Call next middleware if everything is fine
                next();
            })
                .on('error', (error) => {
                // Handle CSV parsing errors
                console.error('CSV parsing error:', error);
                res.status(500).json({ message: 'CSV parsing error', error: error.message });
            });
        });
    }
}
exports.default = new FileUploadRequest();
