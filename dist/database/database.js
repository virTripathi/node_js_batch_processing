"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const promise_1 = __importDefault(require("mysql2/promise"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const env_1 = require("../env/env");
class Database {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            host: env_1.config.host,
            port: env_1.config.port,
            username: env_1.config.username,
            password: env_1.config.password,
            database: env_1.config.database,
            dialect: env_1.config.dialect
        });
    }
    async checkDatabaseExists() {
        try {
            await this.sequelize.authenticate();
            return true;
        }
        catch (error) {
            console.log('Unable to connect to the database:', error.message);
            return false;
        }
    }
    async createDatabase() {
        try {
            const connection = await promise_1.default.createConnection({
                host: env_1.config.host,
                port: env_1.config.port,
                user: env_1.config.username,
                password: env_1.config.password
            });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env_1.config.database}\`;`);
            console.log(`Database '${env_1.config.database}' created successfully.`);
        }
        catch (error) {
            console.error('Error creating database:', error.message);
            process.exit(1);
        }
    }
    async initialize() {
        const dbExists = await this.checkDatabaseExists();
        if (!dbExists) {
            const userResponse = readline_sync_1.default.question('Database does not exist. Do you want to create it? (yes/no): ');
            if (userResponse.toLowerCase() === 'yes') {
                await this.createDatabase();
            }
            else {
                console.log('Database creation cancelled by the user.');
                process.exit(1);
            }
        }
        return this.sequelize;
    }
}
exports.default = Database;
