'use client';
import ProtectedRoute from '@/components/Shared/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
        <main className="max-w-screen-2xl mx-auto">
          {children}
        </main>
    </ProtectedRoute>
  );
}