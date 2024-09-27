import { Migration } from './Migration';
import { CreateUsersTable } from './CreateUsersTable';
import { CreateFileUploadsTable } from './CreateFileUploadsTable';

class Migrator {
  private migrations: Migration[];

  constructor() {
    this.migrations = [
      new CreateUsersTable(),
      new CreateFileUploadsTable()
      // Add more migration classes here as needed
    ];
  }

  public async applyAll(): Promise<void> {
    try {
      for (const migration of this.migrations) {
        console.log(`Applying migration: ${migration.constructor.name}`);
        await migration.up();
        console.log(`Migration applied: ${migration.constructor.name}`);
      }
      console.log('All migrations applied successfully.');
    } catch (error) {
      console.error('Error applying migrations:', error);
      throw error; // Optionally rethrow or handle the error as needed
    }
  }
}

export default new Migrator();
