import Link from 'next/link';

export default function PriceCallout() {
  return (
    <div className="p-2 pl-4 bg-primary/10 border-l-4 border-primary rounded-r-md italic text-sm mb-4">
      <p className="text-darkblue">
        Preise auf Anfrage verfügbar. Kontaktieren Sie uns für ein individuelles Angebot über unser{' '}
        <Link href="/impressum#kontaktformular" className="font-medium underline hover:text-primary transition-colors">
          Kontaktformular
        </Link>.
      </p>
    </div>
  );
}
