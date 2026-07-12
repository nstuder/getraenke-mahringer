import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as productSchema from '@/schema/products';
import * as customerSchema from '@/schema/customers';
import fs from 'fs';
import path from 'path';

const databaseUrl = process.env.DATABASE_URL || 'file:data/database.sqlite';

// Ensure the database file exists if it's a local file
if (databaseUrl.startsWith('file:')) {
  const filePath = databaseUrl.replace('file:', '').split('?')[0];
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
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
