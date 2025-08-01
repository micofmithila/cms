'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    position: '',
    role: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      position: user.position,
      role: user.role,
      password: ''
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/users/${editingUser}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) fetchUsers();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <Link href="/dashboard/users/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Create New User
        </Link>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map(user => (
            <div key={user._id} className="border border-gray-200 rounded-lg p-4 shadow bg-white">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Position:</strong> {user.position}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <div className="space-y-3">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border rounded p-2" />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border rounded p-2" />
              <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="w-full border rounded p-2" />
              <input type="text" name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full border rounded p-2" />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded p-2">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <input type="password" name="password" placeholder="New Password (optional)" value={formData.password} onChange={handleChange} className="w-full border rounded p-2" />
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
