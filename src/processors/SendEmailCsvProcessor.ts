import fs from 'fs';
import { Queues } from "../Queues/queues";
class SendEmailCsvProcessor {
    public file;
    constructor(filePath:string) {
        this.file = fs.readFileSync(filePath);
        this.processCsv();
    }

    private processCsv() {
        console.log(this.file);
        var SendEmailQueue = new Queues().SendEmailQueue.add({email:'A',data:[1,2,3]})
        .then(()=> {
          console.log('added queue');
        })
        .catch((e)=> {
          console.log(e);
        });
    }
}

export default SendEmailCsvProcessor;