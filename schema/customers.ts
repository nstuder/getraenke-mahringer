import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerNumber: text('customer_number').notNull().unique(), // Kundennummer
  name: text('name').notNull(),
  notes: text('notes'), // Anmerkungen
  template: text('template'), // template for product list and quantity
  invoices: text('invoices'), // Rechnungen (invoice number array, stored as JSON string)
  email: text('email'),
  street: text('street'), // Straße
  houseNumber: text('house_number'), // Hausnummer
  city: text('city'), // Stadt
  zipCode: text('zip_code'), // PLZ
  address: text('address'), // Legacy / Full address
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
