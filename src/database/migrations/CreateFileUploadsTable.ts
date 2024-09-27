import { DataTypes } from 'sequelize';
import { Migration } from './Migration';

export class CreateFileUploadsTable extends Migration {
  public async up(): Promise<void> {
    await this.createTable('file_uploads', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },  
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  public async down(): Promise<void> {
    await this.dropTable('Users');
  }
}
