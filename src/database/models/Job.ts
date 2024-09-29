    import { Model, DataTypes, Sequelize } from 'sequelize';
    import database from '../database';
import { NOW } from 'sequelize';

    class Job extends Model {
    public id!: number;
    public queue!: string;
    public payload!: string;
    public attempts!: number;
    public reserved_at!: Date;
    public available_at!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    }
    Job.init(
    {
        id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        },
        queue: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        payload: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        reserved_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        available_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: NOW()
        },
    },
    {
        sequelize: database.sequelize,
        modelName: 'Job',
        tableName: 'jobs',
        timestamps: true,
    });

    export default Job;
