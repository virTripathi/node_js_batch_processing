"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Migration {
    constructor() {
        const database = database_1.default;
        this.queryInterface = database.sequelize.getQueryInterface();
    }
    async createTable(tableName, columns) {
        await this.queryInterface.createTable(tableName, {
            ...columns,
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
    }
    async dropTable(tableName) {
        await this.queryInterface.dropTable(tableName);
    }
}
exports.Migration = Migration;
