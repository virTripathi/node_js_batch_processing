    import { Model, DataTypes, Sequelize } from 'sequelize';
    import database from '../database';

    class FileUpload extends Model {
    // Define properties corresponding to your table columns
    public id!: number;
    public name!: string;
    public path!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    }

    // Initialize FileUpload model with sequelize instance and configuration
    FileUpload.init(
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
        path: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        sequelize: database.sequelize, // Use the sequelize instance from your Database class
        modelName: 'FileUpload', // Set the model name
        tableName: 'file_uploads', // Optionally define your table name
        timestamps: true, // Enable timestamps
    }
    );

    export default FileUpload;
