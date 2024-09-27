import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import validator from 'validator';
import axios from 'axios';

class FileUploadRequest {
    private upload: Multer;

    constructor() {
        this.upload = multer({ storage: multer.memoryStorage() });
    }

    public handle(req: Request, res: Response, next: NextFunction): void {
        this.upload.single('file')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const requiredHeaders = ['s no', 'product name', 'input image urls'];
            const fileContent = req.file.buffer.toString();
            const stream = Readable.from(fileContent);
            const rows: any[] = [];
            let headersValid = true;

            stream.pipe(csvParser())
                .on('headers', (headers: string[]) => {
                    headersValid = requiredHeaders.every(header => headers.includes(header));
                })
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', async () => {
                    if (!headersValid) {
                        return res.status(400).json({ message: 'Invalid CSV headers' });
                    }

                    const validationErrors: string[] = [];
                    for (const [index, row] of rows.entries()) {
                        const rowIndex = index + 1;
                        if (!row['s no'] || isNaN(Number(row['s no']))) {
                            validationErrors.push(`Row ${rowIndex}: 's no' must be a number`);
                        }
                        if (!row['product name'] || typeof row['product name'] !== 'string') {
                            validationErrors.push(`Row ${rowIndex}: 'product name' must be a string`);
                        }
                        if (!row['input image urls'] || typeof row['input image urls'] !== 'string' || !validator.isURL(row['input image urls'])) {
                            validationErrors.push(`Row ${rowIndex}: 'input image urls' must be a valid URL`);
                        } else {
                            try {
                                const response = await axios.head(row['input image urls']);
                                if (!response.headers['content-type'].startsWith('image/')) {
                                    validationErrors.push(`Row ${rowIndex}: 'input image urls' must be a valid image URL`);
                                }
                            } catch (error) {
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

export default new FileUploadRequest();
