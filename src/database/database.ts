import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import readlineSync from 'readline-sync';
import { config } from '../env/env';

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      dialect: config.dialect
    });
  }

  async checkDatabaseExists(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      return true;
    } catch (error: any) {
      console.log('Unable to connect to the database:', error.message);
      return false;
    }
  }

  async createDatabase(): Promise<void> {
    try {
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
      console.log(`Database '${config.database}' created successfully.`);
    } catch (error: any) {
      console.error('Error creating database:', error.message);
      process.exit(1);
    }
  }

  async initialize(): Promise<Sequelize> {
    const dbExists = await this.checkDatabaseExists();

    if (!dbExists) {
      const userResponse = readlineSync.question('Database does not exist. Do you want to create it? (yes/no): ');

      if (userResponse.toLowerCase() === 'yes') {
        await this.createDatabase();
      } else {
        console.log('Database creation cancelled by the user.');
        process.exit(1); 
      }
    }

    return this.sequelize;
  }
}

export default Database;
