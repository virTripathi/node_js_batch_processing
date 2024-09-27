import express from 'express';
import Database from './database/database';
import BaseRouter from './routes/BaseRouter';
import Migrator from './database/migrations/Migrator';

class App {
    public app: express.Application;
    private db: any;
    private migrator: typeof Migrator;

    constructor() {
        this.app = express();
        this.db = null;
        this.migrator = Migrator;
        this.initializeDatabase();
        this.mountRoutes();
    }

    private async initializeDatabase() {
        const database = Database;
        this.db = await database.initialize();
        await this.migrator.applyAll();
    }

    private mountRoutes(): void {
        this.app.use('/', new BaseRouter().router);
    }
}

export default new App().app;
