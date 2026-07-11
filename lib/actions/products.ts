'use server';

import { db } from '@/lib/db';
import { products } from '@/schema/products';
import { eq, like, or, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getProducts({ 
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
        like(products.name, `%${search}%`),
        like(products.brand, `%${search}%`),
        like(products.category, `%${search}%`),
        like(products.description, `%${search}%`)
      )
    : undefined;

  const data = await db.query.products.findMany({
    where,
    limit: pageSize,
    offset,
    orderBy: [products.category, products.name],
  });

  const totalResult = await db.select({ count: sql<number>`count(*)` }).from(products).where(where);
  const total = totalResult[0].count;

  return {
    data,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function createProduct(data: any) {
  await db.insert(products).values(data);
  revalidatePath('/admin/products');
}

export async function updateProduct(id: number, data: any) {
  await db.update(products).set(data).where(eq(products.id, id));
  revalidatePath('/admin/products');
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath('/admin/products');
}

export async function getAllProducts() {
    return db.query.products.findMany({
        orderBy: [products.category, products.name],
    });
}

export async function getAllProductsForExport() {
    return db.query.products.findMany({
        orderBy: [products.category, products.name],
    });
}

export async function importProductsFromCSV(data: any[]) {
    await db.insert(products).values(data);
    revalidatePath('/admin/products');
}
