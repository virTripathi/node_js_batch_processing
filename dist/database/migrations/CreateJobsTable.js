"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobsTable = void 0;
const sequelize_1 = require("sequelize");
const Migration_1 = require("./Migration");
class CreateJobsTable extends Migration_1.Migration {
    async up() {
        await this.createTable('jobs', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        });
    }
    async down() {
        await this.dropTable('Users');
    }
}
exports.CreateJobsTable = CreateJobsTable;
