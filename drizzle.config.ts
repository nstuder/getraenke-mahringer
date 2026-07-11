import type { Config } from 'drizzle-kit';

export default {
  schema: './schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:data/database.sqlite',
  },
} satisfies Config;
