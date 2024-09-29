import { Migration } from './Migration';
import { CreateUsersTable } from './CreateUsersTable';
import { CreateFileUploadsTable } from './CreateFileUploadsTable';
import { CreateJobsTable } from './CreateJobsTable';
import { CreateJobBatchesTable } from './CreateJobBatchesTable';

class Migrator {
  private migrations: Migration[];

  constructor() {
    this.migrations = [
      new CreateUsersTable(),
      new CreateFileUploadsTable(),
      new CreateJobsTable(),
      new CreateJobBatchesTable()
      
    ];
  }

  public async applyAll(): Promise<void> {
    try {
      for (const migration of this.migrations) {
        // console.log(`Applying migration: ${migration.constructor.name}`);
        await migration.up();
        // console.log(`Migration applied: ${migration.constructor.name}`);
      }
      console.log('All migrations applied successfully.');
    } catch (error) {
      console.error('Error applying migrations:', error);
      throw error;
    }
  }
}

export default new Migrator();
