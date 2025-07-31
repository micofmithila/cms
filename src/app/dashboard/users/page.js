'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin') {
      router.push('/dashboard');
    } else {
      fetchUsers();
    }
  }, [session, status]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleUpdate = async () => {
    await fetch(`/api/users/${selectedUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser),
    });
    setDialogOpen(false);
    fetchUsers();
  };

  if (!session || session.user.role !== 'admin') return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="rounded-2xl shadow bg-white p-4 space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar || '/avatar-placeholder.png'}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Role:</b> {user.role}</p>
              <p><b>Position:</b> {user.position}</p>
              <p><b>Bio:</b> {user.bio || '-'}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setDialogOpen(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-xl text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {dialogOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold">Edit User</h2>

            <div className="space-y-2">
              <input
                type="text"
                value={selectedUser.name}
                onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Name"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Email"
              />
              <input
                type="text"
                value={selectedUser.phone}
                onChange={e => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Phone"
              />
              <input
                type="text"
                value={selectedUser.position}
                onChange={e => setSelectedUser({ ...selectedUser, position: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Position"
              />
              <textarea
                value={selectedUser.bio}
                onChange={e => setSelectedUser({ ...selectedUser, bio: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Bio"
              />

              <select
                value={selectedUser.role}
                onChange={e => setSelectedUser({ ...selectedUser, role: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}