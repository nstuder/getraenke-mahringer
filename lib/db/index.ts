import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';
import * as productSchema from '@/schema/products';
import * as customerSchema from '@/schema/customers';
import fs from 'fs';
import path from 'path';

const databaseUrl = process.env.DATABASE_URL || 'file:/app/data/database.sqlite';

// Ensure the database file exists if it's a local file
if (databaseUrl.startsWith('file:')) {
  const filePath = databaseUrl.replace('file:', '').split('?')[0];
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    try {
      // Check if directory is writable
      fs.accessSync(dir, fs.constants.W_OK);
      fs.writeFileSync(filePath, '');
    } catch (e) {
      console.warn(`Warning: Could not create database file at ${filePath}. This might be expected if the directory is read-only or the file will be created by the database client. Error:`, e instanceof Error ? e.message : e);
    }
  }
}

const client = createClient({
  url: databaseUrl,
});

const schema = {
  ...productSchema,
  ...customerSchema,
};

export const db = drizzle(client, { schema });

// Run migrations
const migrationPath = path.join(process.cwd(), 'drizzle');

migrate(db, { migrationsFolder: migrationPath })
  .then(() => console.log('Migrations applied successfully'))
  .catch((err) => console.error('Failed to apply migrations:', err));
