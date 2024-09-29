import { BaseJob } from "./BaseJob";
import { Job, DoneCallback } from "bull";
import WelcomeMail from "../Mail/WelcomeMail";

class SendEmailJob extends BaseJob {
    public async process(job: Job, done: DoneCallback) {
        const { email, data } = job.data;
        const mail = new WelcomeMail({ name: "John Doe" }).send('abc@bcd.com');
        done();
    }
}

export default new SendEmailJob();
