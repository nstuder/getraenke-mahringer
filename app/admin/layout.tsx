'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

const navItems = [
  { name: 'Produkte', href: '/admin/products' },
  { name: 'Rechnungen', href: '/admin/invoices' },
  { name: 'Kunden', href: '/admin/customers' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18">
            <div className="flex items-center">
              <Link href="/admin/products" className="flex-shrink-0 flex items-center mr-8">
                <Image src="/logo.jpg" alt="Logo" width={120} height={60} priority className="h-auto" />
                <span className="ml-4 font-bold text-xl text-darkblue hidden md:block">
                  Admin Bereich
                </span>
              </Link>
              <div className="hidden sm:flex sm:space-x-8 h-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'border-primary text-primary'
                        : 'border-transparent text-darkblue hover:text-primary hover:border-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 bg-darkblue hover:bg-primary text-white px-3 py-1.5 rounded text-sm transition-colors"
              >
                <LogOut size={16} />
                <span>Abmelden</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
