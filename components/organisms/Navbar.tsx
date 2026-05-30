'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/atoms/NavLink';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Alkoholfreie Getränke', href: '/alkoholfreie-getraenke' },
  { name: 'Biermarken', href: '/bier' },
  { name: 'Wein & Sekt', href: '/weine-sekt' },
  { name: 'Verleihservice', href: '/verleihservice' },
  { name: 'Lieferantenlinks', href: '/lieferantenlinks' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'Impressum & Kontakt', href: '/impressum' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Logo above Navbar */}
      <div className="hidden md:flex justify-center bg-white py-2">
        <Image src="/logo.jpg" alt="Logo" width={400} height={200} priority className="h-auto" />
      </div>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md h-18 md:h-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:justify-center h-18 md:h-auto">
            {/* Mobile: Burger and Logo */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-darkblue hover:text-primary hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="flex items-center md:hidden flex-1 justify-center">
              <Image src="/logo.jpg" alt="Logo" width={140} height={70} priority className="h-auto" />
            </div>

            {/* Desktop: Nav Links */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} active={pathname === link.href}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 sm:px-3 bg-white border-b">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-darkblue hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
