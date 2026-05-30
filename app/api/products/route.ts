import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'products.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    
    const lines = fileContent.trim().split('\n');
    const headers = lines[0].split(';');
    
    const products = lines.slice(1).map(line => {
      const values = line.split(';');
      const product: any = {};
      headers.forEach((header, index) => {
        // Only include specified columns and exclude price
        if (header !== 'Preis') {
          product[header] = values[index];
        }
      });
      return product;
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products CSV:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
