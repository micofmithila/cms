'use client';
import ProtectedRoute from '@/components/Shared/ProtectedRoute';
import AdminNavbar from '@/components/Ui/AdminNavbar';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
        <main className="max-w-screen-2xl mx-auto">
          <AdminNavbar /> 
          {children}
        </main>
    </ProtectedRoute>
  );
}