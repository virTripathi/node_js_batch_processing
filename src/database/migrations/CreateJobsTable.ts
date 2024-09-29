import { DataTypes } from 'sequelize';
import { Migration } from './Migration';

export class CreateJobsTable extends Migration {
  public async up(): Promise<void> {
    await this.createTable('jobs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      queue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payload: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      available_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  }

  public async down(): Promise<void> {
    await this.dropTable('jobs');
  }
}
