import { MainData } from "./MainData";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import FileUpload from "../database/models/FileUpload";
import {Queues} from "../Queues/queues";

export class FileUploadData extends MainData {

    private tempDir: string = 'src/temp/files';

    public all(params:Array<any>) {
        
    }

    public get(fileId: number) {

    }

    public async store(request: Request): Promise<number> {
        if (!request.file) {
          throw new Error('No file uploaded');
        }
    
        const fileId = uuidv4();
        const newFileName = `${fileId}-${request.file.originalname}`;
        const newFilePath = path.join(this.tempDir, newFileName);
    
        try {
          await fs.writeFile(newFilePath, request.file.buffer);
        } catch (err:any) {
          throw new Error(`Failed to save file: ${err.message}`);
        }
        try {
        const fileUpload = new FileUpload({
            name: request.file.originalname,
            path: newFilePath
        });
        
        await fileUpload.save();
        console.log('adding queue');
        var SendEmailQueue = new Queues().SendEmailQueue.add({email:'A',data:[1,2,3]})
        .then(()=> {
          console.log('added queue');
        })
        .catch((e)=> {
          console.log(e);
        })
        ;
        return fileUpload.id;
        } catch (err:any) {
            console.error('Failed to store file:', err);

        throw new Error(`Failed to save file details: ${err.message}`);
        }
    }

    public update(id: number, request: Request) {

    }

    public delete(id: number, request: Request) {

    }
}