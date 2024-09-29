import { BaseJob } from "./BaseJob";
import { Job as BullJob, DoneCallback } from "bull";
import WelcomeMail from "../Mail/WelcomeMail";

class SendEmailJob extends BaseJob {
    public async process(job: BullJob, done: DoneCallback) {
        const data= job.data.data;
        const batch = job.data.batch;
        if(data.length>0) {
            data.forEach((ele:any) => {
                new WelcomeMail(ele).send(ele.to);
            });
        }
        done();
    }
}

export default new SendEmailJob();
