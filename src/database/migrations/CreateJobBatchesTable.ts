import { DataTypes } from 'sequelize';
import { Migration } from './Migration';
import { timeStamp } from 'console';

export class CreateJobBatchesTable extends Migration {
  public async up(): Promise<void> {
    await this.createTable('job_batches', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },  
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_jobs: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pending_jobs: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      failed_jobs: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      failed_job_ids: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finished_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  }

  public async down(): Promise<void> {
    await this.dropTable('job_batches');
  }
}
