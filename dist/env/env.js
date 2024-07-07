"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.env = void 0;
exports.env = {
    baseUrl: 'localhost:3000',
    middlewarePath: '/src/middlewares/middlewares.json'
};
exports.config = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nodejs_batch_processing',
    dialect: 'mysql'
};
