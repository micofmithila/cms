'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/',        label: 'Home' },
    { href: '/events',  label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about',   label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const gradientStyle = {
    background: scrolled
      ? 'linear-gradient(135deg, rgba(37, 27, 138, 0.97) 0%, rgba(79, 20, 167, 0.97) 50%, rgba(107, 22, 165, 0.97) 100%)'
      : 'linear-gradient(135deg, #251b8a 0%, #4f14a7 50%, #6b16a5 100%)',
  };

  return (
    <header
      style={gradientStyle}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-xl' : 'shadow-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/30">
              <Image
                src="/logo.jpg"
                alt="MIC of Mithila"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">
                MIC of Mithila
              </span>
              <span
                className="text-[10px] font-semibold tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(to right, #93c5fd, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Where Words Meet Wings
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/15'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/15 px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(link.href)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive(link.href) && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </header>
  );
}