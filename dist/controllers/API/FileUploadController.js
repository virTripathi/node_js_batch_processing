"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../BaseController");
const FileUploadData_1 = require("../../factories/FileUploadData");
class FileUploadController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.fileUploadData = new FileUploadData_1.FileUploadData();
    }
    async save(request, response) {
        try {
            const fileId = await this.fileUploadData.store(request);
            response.status(201).json({ message: 'Success!', fileId: fileId });
        }
        catch (e) {
            response.status(500).json({ message: 'Error!', error: e.message });
        }
    }
}
exports.default = new FileUploadController();
