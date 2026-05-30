import Product from '../molecules/Product';
import Image from 'next/image';

interface ProductData {
    Artikelnummer: string;
    Name: string;
    Kategorie: string;
    Verkaufsmenge: string;
    Marke: string;
    Beschreibung?: string;
}

interface ProductListProps {
    products: ProductData[];
    categoryImages?: Record<string, string>;
}

export default function ProductList({products, categoryImages}: ProductListProps) {
    // Cluster products by category
    const categories = Array.from(new Set(products.map(p => p.Kategorie)));

    return (
        <div className="space-y-5">
            {categories.map(category => (
                <>
                    <h2 className="text-4xl font-bold text-darkblue mb-10 md:container md:mx-auto">
                        {category}
                    </h2>
                    <section key={category} className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
                        {categoryImages && categoryImages[category] && (
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={categoryImages[category]}
                                    alt={category}
                                    fill
                                    className="object-cover mt-0"
                                />
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"/>
                            </div>
                        )}
                        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto">
                                <div
                                    className="columns-1 md:columns-2 lg:columns-3 gap-0 space-y-0 bg-white/60 rounded-lg p-4 shadow-sm">
                                    {products
                                        .filter(p => p.Kategorie === category)
                                        .map(product => (
                                            <div key={product.Artikelnummer} className="break-inside-avoid mb-0">
                                                <Product
                                                    name={product.Name}
                                                    verkaufsmenge={product.Verkaufsmenge}
                                                    marke={product.Marke}
                                                    beschreibung={product.Beschreibung}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ))}
        </div>
    );
}
