import type { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Verleihservice",
    description: "Mieten Sie Zapfanlagen, Biergarnituren, Kühlwagen und mehr für Ihre Veranstaltung beim Getränkeservice Mahringer in Mannheim.",
    keywords: ["Verleihservice", "Zapfanlage mieten", "Biergarnitur leihen", "Kühlwagen Mannheim", "Event-Service"],
};

async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {cache: 'no-store'});
    if (!res.ok) return [];
    return res.json();
}

export default async function Page() {
    const allProducts = await getProducts();
    const categories = ['Verleihservice'];
    const products = allProducts.filter((p: any) => categories.includes(p.Kategorie));

    const images = [
        { src: '/images/rental-service/verleihservice-biergarnitur.png', alt: 'Biergarnitur' },
        { src: '/images/rental-service/verleihservice-zapfanlage.png', alt: 'Zapfanlage' },
        { src: '/images/rental-service/verleihservice-kuehlwagen.png', alt: 'Kühlwagen' },
    ];

    return (
        <div className="space-y-8 md:container md:mx-auto">
            <h1 className="text-4xl font-bold text-darkblue">Verleihservice</h1>
            <p>Folgende Artikel können Sie zu moderaten Preisen bei uns mieten. Falls Sie etwas benötigen, was hier
                nicht aufgelistet sein sollte, lassen Sie uns dies bitte wissen. Wir werden alles daran setzen, ihre
                Wünsche in Erfüllung gehen zu lassen, damit Ihrer nächsten Party/Veranstaltung nichts mehr im Wege
                steht.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-darkblue">Unsere Produkte</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {products.map((product: any, index: number) => (
                            <li key={index}>{product.Name}</li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className={`relative aspect-square ${index === 2 ? 'col-span-2 mx-auto w-1/2' : ''}`}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
