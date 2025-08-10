'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';

const AdminEventRegistrations = () => {
  const { id: eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null); // for modal
  const [loading, setLoading] = useState(true);

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

      {loading ? <LoadingSpinner /> : (<table className="w-full text-sm border border-gray-300 shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, idx) => (
            <tr key={reg._id} className="border-t">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{reg.name}</td>
              <td className="px-4 py-2 text-lg">{reg.isSelected ? '✅' : '❌'}</td>
              <td className="px-4 py-2">{reg.category}</td>
              <td className="px-4 py-2 text-right">
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
      </table>)}

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
              <div><strong>Social Link:</strong> <a href={selectedReg.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedReg.socialLink || <span className='text-red-500'>Not provided</span>}</a></div>
              <div><strong>Content Link:</strong> <a href={selectedReg.contentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedReg.contentLink ||  <span className='text-red-500'>Not provided</span>}</a></div>
              <div><strong>How they know MOM:</strong> {selectedReg.howKnowAboutMic || <span className='text-red-500'>Not provided</span>}</div>
              <div><strong>Any Questions:</strong> {selectedReg.anyQues || <span className='text-red-500'>Not provided</span>}</div>
              <div><strong>Entry Status:</strong> {selectedReg.isSelected ? '✅ Approved' : '❌ Not Approved'}</div>
              <div><strong>Registered on:</strong> {new Date(selectedReg.createdAt).toLocaleString()}</div>
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