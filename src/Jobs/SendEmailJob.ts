import { BaseJob } from "./BaseJob";
import { Job as BullJob, DoneCallback } from "bull";
import JobBatch from "../database/models/JobBatch";
import WelcomeMail from "../Mail/WelcomeMail";

class SendEmailJob extends BaseJob {
    public async process(job: BullJob, done: DoneCallback) {
        const data = job.data.data;
        var batchId = job.data.batchId;
        const batch = await JobBatch.findById(batchId);
        if (!batch) {
            return;
        }
        if (data.length > 0) {
            for (const ele of data) {
                await new WelcomeMail(ele).send(ele.to);
            }
        }
        try {
            batch.pending_jobs -= 1;
            await batch.save();
        } catch(e) {
            console.log(e);
        }
        done();
    }    
}

export default new SendEmailJob();
