import Link from 'next/link';

export default function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 transition-colors block ${
        active
          ? 'bg-primary text-white'
          : 'text-darkblue hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}
