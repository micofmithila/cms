'use client';
import { useEffect, useState } from 'react';

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('desc');
  const [expanded, setExpanded] = useState(null);

  const fetchContacts = async () => {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setContacts(data.contacts || []);
    setLoading(false);
  };

  const toggleReadStatus = async (id, read) => {
    await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: !read }),
    });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts
    .filter((contact) => {
      if (filter === 'read') return contact.read;
      if (filter === 'unread') return !contact.read;
      return true;
    })
    .filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.subject.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sort === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or subject"
          className="p-2 border rounded-md w-full sm:w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
        <select
          className="p-2 border rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredContacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`border rounded-lg p-4 shadow-sm transition bg-white hover:bg-gray-50 ${
                contact.read ? 'opacity-70' : ''
              }`}
            >
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => setExpanded(expanded === contact._id ? null : contact._id)}
              >
                <div>
                  <h2 className="text-lg font-semibold">{contact.name}</h2>
                  <p className="text-sm text-gray-600">{contact.subject}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReadStatus(contact._id, contact.read);
                  }}
                  className={`text-xs px-3 py-1 rounded font-medium shadow-sm transition-colors ${
                    contact.read
                      ? 'bg-gray-500 text-white hover:bg-gray-600'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
              </div>

              {expanded === contact._id && (
                <div className="mt-4 border-t pt-3 text-sm text-gray-700">
                  <p><strong>Email/Phone:</strong> {contact.contact}</p>
                  <p className="mt-2 whitespace-pre-wrap">{contact.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
