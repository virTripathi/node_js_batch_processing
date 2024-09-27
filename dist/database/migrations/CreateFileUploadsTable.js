"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileUploadsTable = void 0;
const sequelize_1 = require("sequelize");
const Migration_1 = require("./Migration");
class CreateFileUploadsTable extends Migration_1.Migration {
    async up() {
        await this.createTable('file_uploads', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
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
        });
    }
    async down() {
        await this.dropTable('Users');
    }
}
exports.CreateFileUploadsTable = CreateFileUploadsTable;
