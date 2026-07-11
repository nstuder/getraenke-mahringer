import type { Metadata } from "next";
import ProductList from '@/components/organisms/ProductList';
import PriceCallout from '@/components/molecules/PriceCallout';

export const metadata: Metadata = {
    title: "Wein & Sekt",
    description: "Erlesene Weißweine, Rotweine und prickelnder Sekt beim Getränkeservice Mahringer in Mannheim.",
    keywords: ["Wein", "Sekt", "Weißwein", "Rotwein", "Getränkeservice Mannheim"],
};

async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {cache: 'no-store'});
    if (!res.ok) return [];
    return res.json();
}

export default async function WeineSektPage() {
    const allProducts = await getProducts();
    const categories = ['Weißweine', 'Rotweine', 'Sekt'];
    const products = allProducts.filter((p: any) => categories.includes(p.Kategorie));

    const categoryImages = {
        'Weißweine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
        'Rotweine': 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop',
        'Sekt': 'https://images.unsplash.com/photo-1643618829236-a23857519fb6?q=80&w=800&auto=format&fit=crop'
    };

    return (
        <div className="space-y-8">

            <div className="md:container md:mx-auto">
                <h1 className="text-4xl font-bold text-darkblue">Wein & Sekt</h1>
                <p className="text-lg text-gray-700">
                    Erlesene Weine und prickelnder Sekt für Ihre besonderen Anlässe.
                </p>
                <PriceCallout />
            </div>
            <ProductList products={products} categoryImages={categoryImages}/>
        </div>
    );
}
