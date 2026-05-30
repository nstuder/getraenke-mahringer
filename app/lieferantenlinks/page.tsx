import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Unsere Partner & Lieferanten",
    description: "Entdecken Sie die Partnermarken und Lieferanten vom Getränkeservice Mahringer in Mannheim.",
};

const suppliers = [
    {
        name: "Almdudler",
        href: "https://www.almdudler.com/",
        image: "/images/suppliers/almdudler.jpg",
    },
    {
        name: "Rheingönheimer Weizenbier",
        href: "http://www.parkbrauerei.de/",
        image: "/images/suppliers/rheingoenheimer.jpg",
    },
    {
        name: "Jever",
        href: "http://www.jever.de/",
        image: "/images/suppliers/jever.jpg",
    },
    {
        name: "Schweppes",
        href: "http://www.schweppes.de/",
        image: "/images/suppliers/schweppes.jpg",
    },
    {
        name: "RedBull",
        href: "http://www.redbull.com/de/de",
        image: "/images/suppliers/redbull.jpg",
    },
    {
        name: "König Ludwig Brauerei",
        href: "http://www.koenig-ludwig-brauerei.com/",
        image: "/images/suppliers/koenig-ludwig.jpg",
    },
    {
        name: "Krombacher",
        href: "https://www.krombacher.de",
        image: "/images/suppliers/krombacher.jpg",
    },
    {
        name: "Fürstenberg",
        href: "https://www.fuerstenberg.de/",
        image: "/images/suppliers/fuerstenberg.jpg",
    },
    {
        name: "Rothaus",
        href: "http://www.rothaus.de/",
        image: "/images/suppliers/rothaus.jpg",
    },
    {
        name: "Bitburger",
        href: "http://agecheck2.bitburger.de/",
        image: "/images/suppliers/bitburger.jpg",
    },
    {
        name: "Warsteiner",
        href: "http://www.warsteiner.de",
        image: "/images/suppliers/warsteiner.jpg",
    },
    {
        name: "Stuttgarter Hofbräu",
        href: "http://www.stuttgarter-hofbraeu.de/",
        image: "/images/suppliers/stuttgarter-hofbraeu.jpg",
    },
    {
        name: "Clausthaler Alkoholfrei",
        href: "http://www.clausthaler.de/",
        image: "/images/suppliers/clausthaler.jpg",
    },
    {
        name: "Schmucker",
        href: "http://www.schmucker-bier.de",
        image: "/images/suppliers/schmucker.jpg",
    },
    {
        name: "Schöfferhofer",
        href: "http://www.schoefferhofer.de/",
        image: "/images/suppliers/schoefferhofer.jpg",
    },
    {
        name: "Gerolsteiner",
        href: "https://www.gerolsteiner.de/",
        image: "/images/suppliers/gerolsteiner.jpg",
    },
    {
        name: "Apollinaris",
        href: "http://www.apollinaris.de",
        image: "/images/suppliers/apollinaris.jpg",
    },
    {
        name: "Paulaner",
        href: "http://www.paulaner.de/",
        image: "/images/suppliers/paulaner.jpg",
    },
    {
        name: "Odenwald-Quelle",
        href: "http://www.odenwaldquelle.de/",
        image: "/images/suppliers/odenwald.jpg",
    },
    {
        name: "König Pilsener",
        href: "https://www.koenig.de/",
        image: "/images/suppliers/koenig-pilsener.jpg",
    },
    {
        name: "Finkenbach Quelle",
        href: "http://www.odenwaldquelle.de/sortiment/finkenbach-quelle/",
        image: "/images/suppliers/finkenbach-quelle.jpg",
    },
    {
        name: "Eichbaum",
        href: "http://www.eichbaum.de",
        image: "/images/suppliers/eichbaum.jpg",
    },
    {
        name: "Coca-Cola",
        href: "http://www.coca-cola-deutschland.de/marken/all/",
        image: "/images/suppliers/coca-cola.jpg",
    },
    {
        name: "Bionade",
        href: "http://www.bionade.de/",
        image: "/images/suppliers/bionade.jpg",
    },
    {
        name: "Himmelheber | Apfelwein und Fruchtsäfte",
        href: "http://kelterei-himmelheber.de/",
        image: "/images/suppliers/himmelheber.jpg",
    },
    {
        name: "Kelterei Stenger",
        href: "http://kelterei-stenger.de",
        image: "/images/suppliers/stenger.jpg",
    },
];

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkblue mb-8">Lieferantenlinks</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {suppliers.map((supplier) => (
                    <a
                        key={supplier.name}
                        href={supplier.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block transition-transform hover:scale-105"
                        title={supplier.name}
                    >
                        <div
                            className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white">
                            <Image
                                src={supplier.image}
                                alt={supplier.name}
                                fill
                                className="object-contain mt-0"
                            />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
