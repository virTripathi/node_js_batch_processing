import { QueryInterface, DataTypes } from 'sequelize';
import Database from '../database';

export abstract class Migration {
  protected queryInterface: QueryInterface;

  constructor() {
    const database = Database;
    this.queryInterface = database.sequelize.getQueryInterface();
  }

  public abstract up(): Promise<void>;

  public abstract down(): Promise<void>;

  protected async createTable(tableName: string, columns: Record<string, any>): Promise<void> {
    await this.queryInterface.createTable(tableName, {
      ...columns,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  }

  protected async dropTable(tableName: string): Promise<void> {
    await this.queryInterface.dropTable(tableName);
  }
}
