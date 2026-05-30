import type { Metadata } from "next";
import ProductList from '@/components/organisms/ProductList';

export const metadata: Metadata = {
    title: "Bier & Fassbier",
    description: "Große Auswahl an regionalen und überregionalen Biersorten, Weizenbier und Fassbier in Mannheim.",
    keywords: ["Bier", "Weizenbier", "Fassbier", "Regionales Bier", "Getränkeservice Mannheim"],
};

async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {cache: 'no-store'});
    if (!res.ok) return [];
    return res.json();
}

export default async function BierPage() {
    const allProducts = await getProducts();
    const categories = ['Bier', 'Weizenbier', 'Fassbier'];
    const products = allProducts.filter((p: any) => categories.includes(p.Kategorie));

    const categoryImages = {
        'Bier': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=800&auto=format&fit=crop',
        'Weizenbier': 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=800&auto=format&fit=crop',
        'Fassbier': 'https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?q=80&w=800&auto=format&fit=crop'
    };

    return (
        <div className="space-y-8">
            <div className="md:container md:mx-auto">
                <h1 className="text-4xl font-bold text-darkblue">Biermarken</h1>
                <p className="text-lg text-gray-700">
                    Wir führen eine Vielzahl an regionalen und überregionalen Biersorten.
                </p>
            </div>
            <ProductList products={products} categoryImages={categoryImages}/>
        </div>
    );
}
