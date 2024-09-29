import { Model, DataTypes, Sequelize } from 'sequelize';
import database from '../database';

class JobBatch extends Model {
    static async findById(batchId: number): Promise<JobBatch | null> {
        return await JobBatch.findByPk(batchId);
    }
    public id!:  number;
    public name!:  string;
    public total_jobs!:  number;
    public pending_jobs!:  number;
    public failed_jobs!:  number;
    public failed_job_ids!:  JSON;
    public cancelled_at!:  Date;
    public finished_at!:  Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

JobBatch.init(
{
    id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
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
        defaultValue:0
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
},
{
    sequelize: database.sequelize,
    modelName: 'JobBatch',
    tableName: 'job_batches',
    timestamps: true,
});

export default JobBatch;
