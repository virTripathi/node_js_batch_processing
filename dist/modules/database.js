"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const promise_1 = __importDefault(require("mysql2/promise"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const database_1 = require("../config/database");
class Database {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            host: database_1.config.host,
            port: database_1.config.port,
            username: database_1.config.username,
            password: database_1.config.password,
            database: database_1.config.database,
            dialect: database_1.config.dialect
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
                host: database_1.config.host,
                port: database_1.config.port,
                user: database_1.config.username,
                password: database_1.config.password
            });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database_1.config.database}\`;`);
            console.log(`Database '${database_1.config.database}' created successfully or already exists.`);
        }
        catch (error) {
            console.error('Error creating database:', error.message);
            process.exit(1); // Exit the process with a failure code
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
                process.exit(1); // Exit the process if the user cancels database creation
            }
        }
        else {
            console.log('Database already exists. No further action needed.');
        }
        return this.sequelize;
    }
}
exports.default = Database;
