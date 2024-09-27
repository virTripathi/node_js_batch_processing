"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUsersTable_1 = require("./CreateUsersTable");
const CreateFileUploadsTable_1 = require("./CreateFileUploadsTable");
class Migrator {
    constructor() {
        this.migrations = [
            new CreateUsersTable_1.CreateUsersTable(),
            new CreateFileUploadsTable_1.CreateFileUploadsTable()
            // Add more migration classes here as needed
        ];
    }
    async applyAll() {
        try {
            for (const migration of this.migrations) {
                console.log(`Applying migration: ${migration.constructor.name}`);
                await migration.up();
                console.log(`Migration applied: ${migration.constructor.name}`);
            }
            console.log('All migrations applied successfully.');
        }
        catch (error) {
            console.error('Error applying migrations:', error);
            throw error; // Optionally rethrow or handle the error as needed
        }
    }
}
exports.default = new Migrator();
