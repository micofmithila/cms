'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminNavbar() {
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

  if (!session) return null;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-lg sticky top-0 z-[60] border-b-4 border-purple-600">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Admin Title */}
        <Link
          href="/dashboard"
          className="text-xl sm:text-2xl font-extrabold tracking-wider hover:text-purple-400 transition"
        >
          Admin Dashboard
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
