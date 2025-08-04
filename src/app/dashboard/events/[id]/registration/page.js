'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const AdminEventRegistrations = () => {
  const { id: eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null); // for modal

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await fetch(`/api/events/${eventId}/register`);
      const data = await res.json();
      setRegistrations(data);
    };

    fetchRegistrations();
  }, [eventId]);

  const toggleSelection = async (regId, current) => {
    const res = await fetch(`/api/events/${eventId}/register`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId: regId, isSelected: !current }),
    });

    if (res.ok) {
      const updated = registrations.map((r) =>
        r._id === regId ? { ...r, isSelected: !current } : r
      );
      setRegistrations(updated);
      setSelectedReg((prev) =>
        prev && prev._id === regId ? { ...prev, isSelected: !current } : prev
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Registrations</h1>

      <table className="w-full text-sm border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th>Status</th>
            <th className="text-right px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id} className="border-t">
              <td className="px-4 py-2">{reg.name}</td>
              <td className={`font-semibold ${reg.isSelected ? 'text-green-600' : 'text-red-600'}`}>
                {reg.isSelected ? 'Approved' : 'Not Approved'}
              </td>
              <td className="text-right px-4 py-2">
                <button
                  onClick={() => setSelectedReg(reg)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl relative">
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
              <div><strong>Social Link:</strong> <a href={selectedReg.socialLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{selectedReg.socialLink}</a></div>
              <div><strong>Content Link:</strong> <a href={selectedReg.contentLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{selectedReg.contentLink}</a></div>
              <div><strong>Other Ques:</strong> {selectedReg.otherQues}</div>
              <div><strong>Entry Status:</strong> {selectedReg.isSelected ? '✅ Approved' : '❌ Not Approved'}</div>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => toggleSelection(selectedReg._id, selectedReg.isSelected)}
                className={`px-4 py-2 font-medium text-white rounded ${selectedReg.isSelected ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {selectedReg.isSelected ? 'Decline Entry' : 'Approve Entry'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventRegistrations;