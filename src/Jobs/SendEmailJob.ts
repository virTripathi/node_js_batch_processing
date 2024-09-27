import { BaseJob } from "./BaseJob";
import { Job, DoneCallback } from "bull";

class SendEmailJob extends BaseJob {
    public async process(job: Job, done: DoneCallback) {
        const { email, data } = job.data;
        console.log('Sending email to:', email, 'with data:', data);
        
        done();
    }
}

export default new SendEmailJob();
