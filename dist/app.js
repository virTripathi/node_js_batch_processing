"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database/database"));
const BaseRouter_1 = __importDefault(require("./routes/BaseRouter"));
const Migrator_1 = __importDefault(require("./database/migrations/Migrator"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.db = null;
        this.migrator = Migrator_1.default;
        this.initializeDatabase();
        this.mountRoutes();
    }
    async initializeDatabase() {
        const database = database_1.default;
        this.db = await database.initialize();
        await this.migrator.applyAll();
    }
    mountRoutes() {
        this.app.use('/', new BaseRouter_1.default().router);
    }
}
exports.default = new App().app;
