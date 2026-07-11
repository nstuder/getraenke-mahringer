'use server';

import { db } from '@/lib/db';
import { customers } from '@/schema/customers';
import { eq, like, or, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getCustomers({ 
  page = 1, 
  search = '', 
  pageSize = 20 
}: { 
  page?: number, 
  search?: string, 
  pageSize?: number 
}) {
  const offset = (page - 1) * pageSize;
  
  const where = search 
    ? or(
        like(customers.name, `%${search}%`),
        like(customers.customerNumber, `%${search}%`),
        like(customers.email, `%${search}%`),
        like(customers.street, `%${search}%`),
        like(customers.city, `%${search}%`),
        like(customers.address, `%${search}%`)
      )
    : undefined;

  const data = await db.query.customers.findMany({
    where,
    limit: pageSize,
    offset,
    orderBy: [customers.name],
  });

  const totalResult = await db.select({ count: sql<number>`count(*)` }).from(customers).where(where);
  const total = totalResult[0].count;

  return {
    data,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function createCustomer(data: any) {
  await db.insert(customers).values(data);
  revalidatePath('/admin/customers');
}

export async function updateCustomer(id: number, data: any) {
  await db.update(customers).set(data).where(eq(customers.id, id));
  revalidatePath('/admin/customers');
}

export async function deleteCustomer(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
  revalidatePath('/admin/customers');
}

export async function getAllCustomersForExport() {
    return db.query.customers.findMany({
        orderBy: [customers.name],
    });
}

export async function importCustomersFromCSV(data: any[]) {
    // Basic validation / transformation might be needed
    await db.insert(customers).values(data);
    revalidatePath('/admin/customers');
}
