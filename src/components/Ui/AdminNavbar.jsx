'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const logoutPromise = signOut({ redirect: false });

    toast.promise(logoutPromise, {
      loading: 'Logging out...',
      success: 'Logged out successfully!',
      error: 'Logout failed. Please try again.',
    });

    await logoutPromise;
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Title / Logo */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/" className="hover:text-yellow-300 transition">
            MIC of Mithila
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="space-x-6 hidden md:flex text-lg font-medium">
          {/* <Link href="/" className="hover:text-yellow-300 transition">Home</Link> */}
          <Link href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          <Link href="/dashboard/events" className="hover:text-yellow-300 transition">Events</Link>
          <Link href="/dashboard/gallery" className="hover:text-yellow-300 transition">Gallery</Link>
          <Link href="/dashboard/about" className="hover:text-yellow-300 transition">About Us</Link>
          <Link href="/dashboard/contact" className="hover:text-yellow-300 transition">Contact</Link>
          <Link href="/dashboard/profile" className="hover:text-yellow-300 transition">Profile</Link>
        </div>

        {/* Auth Button */}
        <div>
          {session ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
