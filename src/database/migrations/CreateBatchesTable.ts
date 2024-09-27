import { DataTypes } from 'sequelize';
import { Migration } from './Migration';

export class CreateBatchesTable extends Migration {
  public async up(): Promise<void> {
    await this.createTable('batches', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },  
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  }

  public async down(): Promise<void> {
    await this.dropTable('Users');
  }
}
