import type { Metadata } from "next";
import Card from '@/components/molecules/Card';

export const metadata: Metadata = {
    title: "Startseite - Getränkeservice Mahringer Mannheim",
    description: "Willkommen beim Getränkeservice Mahringer in Mannheim. Ihr Partner für Getränke aller Art",
};

export default function Home() {
    const cards = [
        {
            title: 'Alkoholfreie Getränke',
            description: 'Erfrischenden alkoholfreien Getränken, von Mineralwasser bis hin zu Fruchtsäften.',
            imageSrc: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
            imageAlt: 'Alkoholfreie Getränke',
            buttonHref: '/alkoholfreie-getraenke',
            buttonText: 'Mehr erfahren',
        },
        {
            title: 'Biermarken',
            description: 'Wir führen eine Vielzahl an regionalen und überregionalen Biersorten für jeden Geschmack.',
            imageSrc: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=800&auto=format&fit=crop',
            imageAlt: 'Bierflaschen',
            buttonHref: '/bier',
            buttonText: 'Mehr erfahren',
        },
        {
            title: 'Wein & Sekt',
            description: 'Erlesene Weine und prickelnder Sekt für Ihre besonderen Anlässe oder den gemütlichen Abend.',
            imageSrc: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
            imageAlt: 'Weingläser',
            buttonHref: '/weine-sekt',
            buttonText: 'Mehr erfahren',
        },
        {
            title: 'Verleihservice',
            description: 'Zapfanlagen, Gläser, Garnituren und mehr – wir unterstützen Sie bei der Planung und Ausstattung Ihrer Feier.',
            imageSrc: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop',
            imageAlt: 'Verleihservice Equipment',
            buttonHref: '/verleihservice',
            buttonText: 'Mehr erfahren',
        },
    ];

    return (
        <div className="space-y-12 md:container md:mx-auto">
            <h1 className="text-4xl font-bold text-darkblue mb-12">Willkommen bei Getränkeservice Mahringer</h1>
            <p>Wer in Mannheim Getränke und Lieferservice genießen will, ist hier genau richtig. Der Mahringer
                Getränkehandel lädt jetzt schon seit 100 Jahren dazu ein, den Tag hinter sich zu lassen und die Getränke
                und Lieferservice auf eine besondere Art zu erleben. Kommt doch einfach mal vorbei, und lasst euch von
                der besonderen Atmosphäre begeistern. Der Mahringer Getränkehandel ist immer einen Besuch wert.</p>

            <h2 className="text-3xl font-bold text-darkblue mb-10">Verschaffen Sie sich einen Überblick über unsere
                Leistungen
            </h2>
            <p>Neben dem klassischen Lieferdienst für Getränke bieten wir auch einen Verleihservice für Ihre nächste
                Veranstaltung. Schauen Sie sich um auf unseren Seiten, entdecken Sie die Vielfalt unseres
                Getränkesortiments, welches wir bis zu Ihnen ins Büro oder nach Hause liefern.
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </div>
    );
}
