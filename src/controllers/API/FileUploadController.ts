import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { FileUploadData } from "../../factories/FileUploadData";

class FileUploadController extends BaseController {

    fileUploadData: FileUploadData;
    constructor() {
        super();
        this.fileUploadData = new FileUploadData();
    }

    public async save(request: Request, response: Response) {
        try {
            const fileId = await this.fileUploadData.store(request);
            response.status(201).json({ message: 'Success!', fileId: fileId });
        } catch(e: any) {
            response.status(500).json({ message: 'Error!', error: e.message });
        }
    }
}
export default new FileUploadController();