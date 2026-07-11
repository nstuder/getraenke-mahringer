import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: text('quantity'), // Verkaufsmenge
  description: text('description'),
  price: real('price').notNull(), // Preis
  brand: text('brand'), // Marke
  category: text('category').notNull(), // Kategorie
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
