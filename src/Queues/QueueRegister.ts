import Bull, {Queue} from 'bull';
import { REDIS_PORT, REDIS_URI } from '../env/env';

class QueueRegister {
    private queues: { [key: string]: Queue };

    constructor() {
        this.queues = {};
    }

    public createQueue(name: string) {
        const queue = new Bull(name, {
            redis: {
                host: REDIS_URI,
                port: REDIS_PORT
            },
        });
        this.queues[name] = queue;
        queue.process(async (job) => {
            const jobClassName = name.replace('Queue', 'Job');
            let JobClass;
            try {
                JobClass = await import(`../Jobs/${jobClassName}`);
            } catch (error) {
                console.error(`Failed to import Job class ${jobClassName}:`, error);
                return;
            }
            if (JobClass.default && typeof JobClass.default.process === 'function') {
                await JobClass.default.process(job);
            } else {
                console.error(`Job class ${jobClassName} does not have a valid process method.`);
            }
        });
        return queue;
    }

    public getQueue(name: string): Bull.Queue | undefined {
        return this.queues[name];
    }

    public getAllQueues() {
        return this.queues;
    }
}

export default QueueRegister;