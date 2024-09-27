"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class FileUpload extends sequelize_1.Model {
}
// Initialize FileUpload model with sequelize instance and configuration
FileUpload.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default.sequelize, // Use the sequelize instance from your Database class
    modelName: 'FileUpload', // Set the model name
    tableName: 'file_uploads', // Optionally define your table name
    timestamps: true, // Enable timestamps
});
exports.default = FileUpload;
