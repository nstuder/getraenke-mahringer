import type { Config } from 'drizzle-kit';

export default {
  schema: './schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:data/database.sqlite',
  },
} satisfies Config;
