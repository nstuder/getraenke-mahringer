import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonHref: string;
  buttonText: string;
}

export default function Card({ title, description, imageSrc, imageAlt, buttonHref, buttonText }: CardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl border-2 border-darkblue overflow-hidden shadow-md">
      <div className="relative w-full aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-darkblue mb-2">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
        </div>
        <div>
          <Link
            href={buttonHref}
            className="inline-block bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
