import { BaseJob } from "./BaseJob";
import { Job as BullJob } from "bull";
import fs from 'fs';
import csvParser from "csv-parser";
import { Queues } from "../Queues/queues";
import Job from '../database/models/Job';
import JobBatch from "../database/models/JobBatch";

class ProcessCsvJob extends BaseJob {
    public async process(job: BullJob) {
        const fileName = job.data.fileName;
        const batchId = job.data.batchId;
        const batch = await JobBatch.findById(batchId);
        if (!batch) {
            return;
        }
        try {
            await this.processCsv(fileName, batch);
        } catch (error) {
            console.error('Error processing CSV:', error);
        }
    }

    private async processCsv(fileName: string, batch: JobBatch) {
        const csvData: any[] = [];
        const stream = fs.createReadStream(fileName).pipe(csvParser());

        stream.on('data', async (data) => {
            csvData.push(data);
            if (csvData.length === 100) {
                await this.createJobsUpdateBatch(batch, csvData);
                csvData.length = 0;
            }
        });

        stream.on('end', async () => {
            if (csvData.length > 0) {
                await this.createJobsUpdateBatch(batch, csvData);
                csvData.length = 0;
            }
        });

        stream.on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
    }

    private async createJobsUpdateBatch(batch: JobBatch, csvData: Array<any>) {
        const job = new Job({
            queue: '',
            payload: JSON.stringify(csvData),
            attempts: 0,
        });
        var failed_job_ids = [];
        try {
            await job.save();
            batch.total_jobs += 1;
            batch.pending_jobs += 1;
            await batch.save();
            await new Queues().SendEmailQueue.add({ data: csvData, batchId: batch.id });
            job.reserved_at = new Date();
            await job.save();
        } catch (error) {
            job.attempts += 1;
            await job.save();
            batch.failed_jobs += 1;
            batch.save();
            failed_job_ids.push(job.id);
        } finally {
            batch.failed_job_ids = JSON.parse(JSON.stringify(failed_job_ids));
            batch.finished_at = new Date();
            await batch.save();
        }
    }
}

export default new ProcessCsvJob();
