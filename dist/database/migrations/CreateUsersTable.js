"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable = void 0;
const sequelize_1 = require("sequelize");
const Migration_1 = require("./Migration");
class CreateUsersTable extends Migration_1.Migration {
    async up() {
        await this.createTable('Users', {
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
exports.CreateUsersTable = CreateUsersTable;
