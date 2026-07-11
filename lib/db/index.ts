import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as productSchema from '@/schema/products';
import * as customerSchema from '@/schema/customers';

const client = createClient({
  url: 'file:data/database.sqlite',
});

const schema = {
  ...productSchema,
  ...customerSchema,
};

export const db = drizzle(client, { schema });
