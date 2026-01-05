'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';

const AdminEventRegistrations = () => {
  const { id: eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchName, setSearchName] = useState('');


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await fetch(`/api/events/${eventId}/register`);
      const data = await res.json();
      setRegistrations(data);
      setLoading(false);
    };

    fetchRegistrations();
  }, [eventId]);

  const toggleSelection = async (regId, current) => {
    const res = await fetch(`/api/events/${eventId}/register`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId: regId, isApproved: !current }),
    });

    if (res.ok) {
      const updated = registrations.map((r) =>
        r._id === regId ? { ...r, isApproved: !current } : r
      );
      setRegistrations(updated);
      setSelectedReg((prev) =>
        prev && prev._id === regId ? { ...prev, isApproved: !current } : prev
      );
    }
  };

  // Filtered Data
  const filteredData = useMemo(() => {
    return registrations.filter((reg) => {
      const categoryMatch = filterCategory === 'All' ||
        (filterCategory === 'Performers' && reg.category !== 'Audience') ||
        reg.category === filterCategory;
      const statusMatch =
        filterStatus === 'All' ||
        (filterStatus === 'Approved' && reg.isApproved) ||
        (filterStatus === 'Not Approved' && !reg.isApproved);

      const nameMatch =
        reg.name?.toLowerCase().includes(searchName.toLowerCase());

      return categoryMatch && statusMatch && nameMatch;
    });
  }, [registrations, filterCategory, filterStatus, searchName]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Category counts
  const categorySummary = useMemo(() => {
    const counts = {};
    registrations.forEach((reg) => {
      counts[reg.category] = (counts[reg.category] || 0) + 1;
    });
    return counts;
  }, [registrations]);

  return (
    <div className="py-6 px-3 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Registrations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Performers">Performers Only</option>
          {[...new Set(registrations.map((r) => r.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* 🔍 Name Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="w-full text-sm border border-gray-300 shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((reg, idx) => (
              <tr key={reg._id} className="border-t">
                <td className="px-4 py-2">{(currentPage - 1) * pageSize + idx + 1}</td>
                <td
                  className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedReg(reg)}
                >
                  {reg.name}
                </td>
                <td className="px-4 py-2 text-lg">{reg.isApproved ? '✅' : '❌'}</td>
                <td className="px-4 py-2">{reg.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination controls */}
      {!loading && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⏮
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀
          </button>
          <span className="px-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ▶
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⏭
          </button>
        </div>
      )}

      {/* Summary */}
      {!loading && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>

          {/* Overall Stats */}
          <div className="flex flex-wrap gap-6 mb-4">
            <p>Total Registrations: {registrations.length}</p>
            <p className="text-green-600 font-medium">
              ✅ Approved: {registrations.filter(r => r.isApproved).length}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(categorySummary).map(([cat, total]) => {
              const approvedCount = registrations.filter(
                r => r.category === cat && r.isApproved
              ).length;

              return (
                <div
                  key={cat}
                  className="border rounded-lg p-3 shadow-sm bg-gray-50"
                >
                  <p className="font-medium">{cat}</p>
                  <p>Total: {total}</p>
                  <p className="text-green-600">
                    ✅ Approved: {approvedCount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}



      {/* Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setSelectedReg(null)}
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-4">Registration Details</h2>
            <div className="space-y-2 text-sm">
              <div><strong>Name:</strong> {selectedReg.name}</div>
              <div><strong>Email:</strong> {selectedReg.email}</div>
              <div><strong>Phone:</strong> {selectedReg.phone}</div>
              <div><strong>Category:</strong> {selectedReg.category}</div>
              <div><strong>Age:</strong> {selectedReg.age}</div>
              <div><strong>Address:</strong> {selectedReg.address}</div>
              <div>
                <strong>Social Link:</strong>{' '}
                {selectedReg.socialLink ? (
                  <a href={selectedReg.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open Social Link</a>
                ) : (
                  <span className="text-red-500">Not provided</span>
                )}
              </div>
              <div>
                <strong>Content Link:</strong>{' '}
                {selectedReg.contentLink ? (
                  <a href={selectedReg.contentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Content</a>
                ) : (
                  <span className="text-red-500">Not provided</span>
                )}
              </div>
              <div>
                <strong>How they know MOM:</strong>{' '}
                {selectedReg.howKnowAboutMic || <span className="text-red-500">Not provided</span>}
              </div>
              <div>
                <strong>Any Questions:</strong>{' '}
                {selectedReg.anyQues || <span className="text-red-500">Not provided</span>}
              </div>
              <div><strong>Entry Status:</strong> {selectedReg.isApproved ? '✅ Approved' : '❌ Not Approved'}</div>
              <div><strong>Registered on:</strong> {new Date(selectedReg.createdAt).toLocaleString()}</div>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => toggleSelection(selectedReg._id, selectedReg.isApproved)}
                className={`px-4 py-2 font-medium text-white rounded ${selectedReg.isApproved ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {selectedReg.isApproved ? 'Decline Entry' : 'Approve Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventRegistrations;