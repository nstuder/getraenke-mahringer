import type { Metadata } from "next";
import ProductList from '@/components/organisms/ProductList';

export const metadata: Metadata = {
    title: "Alkoholfreie Getränke",
    description: "Große Auswahl an Mineralwasser, Säften und Erfrischungsgetränken beim Getränkeservice Mahringer in Mannheim.",
    keywords: ["Alkoholfreie Getränke", "Mineralwasser", "Säfte", "Limonade", "Getränkelieferservice Mannheim"],
};

async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {cache: 'no-store'});
    if (!res.ok) return [];
    return res.json();
}

export default async function AlkoholfreieGetraenkePage() {
    const allProducts = await getProducts();
    const categories = ['Alkoholfreie Getränke', 'Säfte', 'Mineralwasser'];
    const products = allProducts.filter((p: any) => categories.includes(p.Kategorie));

    const categoryImages = {
        'Alkoholfreie Getränke': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
        'Säfte': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
        'Mineralwasser': 'https://images.unsplash.com/photo-1595994195534-d5219f02f99f?q=80&w=800&auto=format&fit=crop'
    };

    return (
        <div className="space-y-8">
            <div className="md:container md:mx-auto">
                <h1 className="text-4xl font-bold text-darkblue">Alkoholfreie Getränke</h1>
                <p className="text-lg text-gray-700">
                    Entdecken Sie unser breites Sortiment an erfrischenden alkoholfreien Getränken.
                </p>
            </div>
            <ProductList products={products} categoryImages={categoryImages}/>
        </div>
    );
}
