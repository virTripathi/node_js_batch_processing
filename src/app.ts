import express from 'express';
import Database from './database/database';
import ApiRouter from './routes/ApiRouter';
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
    const database = new Database();
    this.db = await database.initialize();
    await this.migrator.applyAll();
  }

  private mountRoutes(): void {
    this.app.use('/api', ApiRouter);
  }
}

export default new App().app;
