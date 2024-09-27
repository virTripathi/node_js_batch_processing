"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadData = void 0;
const MainData_1 = require("./MainData");
const uuid_1 = require("uuid");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const FileUpload_1 = __importDefault(require("../database/models/FileUpload"));
class FileUploadData extends MainData_1.MainData {
    constructor() {
        super(...arguments);
        this.tempDir = 'src/temp/files';
    }
    all(params) {
    }
    get(fileId) {
    }
    async store(request) {
        if (!request.file) {
            throw new Error('No file uploaded');
        }
        const fileId = (0, uuid_1.v4)();
        const newFileName = `${fileId}-${request.file.originalname}`;
        const newFilePath = path_1.default.join(this.tempDir, newFileName);
        try {
            await promises_1.default.writeFile(newFilePath, request.file.buffer); // Save file to temp directory
        }
        catch (err) {
            throw new Error(`Failed to save file: ${err.message}`);
        }
        // Save file details to database using your FileUpload model
        try {
            const fileUpload = new FileUpload_1.default({
                name: request.file.originalname,
                path: newFilePath
            });
            await fileUpload.save(); // Save to your database
            return fileUpload.id; // Return the fileId to caller if needed
        }
        catch (err) {
            console.error('Failed to store file:', err);
            throw new Error(`Failed to save file details: ${err.message}`);
        }
    }
    update(id, request) {
    }
    delete(id, request) {
    }
}
exports.FileUploadData = FileUploadData;
