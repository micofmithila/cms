'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="MIC of Mithila Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-wide">MIC of Mithila</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6 text-sm lg:text-base font-medium">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-yellow-300 transition">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-700 to-purple-700 text-center py-4 px-4 space-y-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block text-base font-medium hover:text-yellow-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
