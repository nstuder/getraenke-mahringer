import { db } from '../lib/db';
import { products } from '../schema/products';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

async function migrate() {
  const csvFilePath = path.join(process.cwd(), 'data/products.csv');
  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    delimiter: ';',
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records in CSV.`);

  const productsToInsert = records.map((record: any) => {
    const priceRaw = record['Preis']?.replace(',', '.') || '0';
    const price = parseFloat(priceRaw);
    return {
      name: record['Name'],
      quantity: record['Verkaufsmenge'],
      description: record['Beschreibung'],
      price: isNaN(price) ? 0 : price,
      brand: record['Marke'],
      category: record['Kategorie'],
    };
  }).filter((p: any) => p.name || p.category);

  console.log(`Inserting ${productsToInsert.length} products...`);

  await db.insert(products).values(productsToInsert);

  console.log('Migration completed.');
}

migrate().catch(console.error);
