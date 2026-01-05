'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  const getDateTimeString = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
      `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  };

  const formatDateReadable = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'long',
    });
  };

  const formatTimeReadable = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };


  const downloadPDF = () => {
    if (!filteredData.length) return;

    const doc = new jsPDF();

    const category =
      filterCategory === 'All'
        ? 'All'
        : filterCategory === 'Performers'
          ? 'Performers'
          : filterCategory;

    const status =
      filterStatus === 'All'
        ? 'All'
        : filterStatus === 'Approved'
          ? 'Approved'
          : 'NotApproved';

    const fileName = `MOM_${category}_${status}_List_${getDateTimeString()}.pdf`;

    // Title
    doc.setFontSize(14);
    doc.text(`Mic Of Mithila – Registration List – ${category}`, 14, 15);

    // Date & Time line
    doc.setFontSize(10);

    const dateText = formatDateReadable();
    const timeText = formatTimeReadable();

    // Left aligned date
    doc.text(dateText, 14, 22);

    // Right aligned time
    doc.text(
      timeText,
      doc.internal.pageSize.getWidth() - 14,
      22,
      { align: 'right' }
    );


    const tableBody = filteredData.map((reg, idx) => [
      idx + 1,
      reg.name,
      reg.category,
      reg.isApproved ? 'Y' : 'N',
      reg.contentLink ? 'View Content' : 'No Content',
      reg.socialLink ? 'Open Social' : 'No Social',
    ]);
    // TODO: Hindi font support for PDF



    autoTable(doc,
      {
        head: [[
          '#',
          'Name',
          'Category',
          'Status',
          'Content',
          'Social'
        ]],
        body: tableBody,
        startY: 28,
        styles: {
          fontSize: 9,
          valign: 'middle',
        },

        // 1️⃣ REMOVE autoTable text for link columns
        didParseCell(data) {
          const reg = filteredData[data.row.index];
          if (!reg) return;

          if (data.column.index === 4 && reg.contentLink) {
            data.cell.text = [''];
          }

          if (data.column.index === 5 && reg.socialLink) {
            data.cell.text = [''];
          }
        },

        // 2️⃣ DRAW PERFECTLY CENTERED CLICKABLE LINKS
        didDrawCell(data) {
          // 🚫 Prevent header/footer duplication
          if (data.section !== 'body') return;

          const reg = filteredData[data.row.index];
          if (!reg) return;

          const colIndex = data.column.index;

          let text = '';
          let link = '';

          if (colIndex === 4 && reg.contentLink) {
            text = 'View Content';
            link = reg.contentLink;
          }

          if (colIndex === 5 && reg.socialLink) {
            text = 'Open Social';
            link = reg.socialLink;
          }

          if (!text) return;

          const fontSize = 9;
          doc.setFontSize(fontSize);
          doc.setTextColor(0, 0, 255);

          const textWidth = doc.getTextWidth(text);

          const x =
            data.cell.x +
            (data.cell.width - textWidth) / 2 -
            0.8;

          const y =
            data.cell.y +
            data.cell.height / 2 +
            fontSize / 2 -
            4;

          doc.textWithLink(text, x, y, { url: link });

          doc.setTextColor(0, 0, 0);
        }


      }
    );

    doc.save(fileName);
  };

  return (
    <div className="py-6 px-3 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Registrations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 mx-2 justify-between">
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
      {/* 🔍 Name Search */}
      <div className="flex flex-wrap gap-4 mb-4 mx-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full border border-gray-300 rounded overflow-hidden">
            <table className="w-full text-xs sm:text-sm table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-[8%] px-1 py-2 text-left">#</th>
                  <th className="w-[47%] px-2 py-2 text-left">Name</th>
                  <th className="w-[30%] px-2 py-2 text-left">Category</th>
                  <th className="w-[15%] px-1 py-2 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((reg, idx) => (
                  <tr key={reg._id} className="border-t">
                    {/* Serial Number */}
                    <td className="px-1 py-2 text-gray-500">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>

                    {/* Name */}
                    <td
                      className="px-2 py-2 text-blue-600 truncate cursor-pointer hover:underline"
                      onClick={() => setSelectedReg(reg)}
                      title={reg.name}
                    >
                      {reg.name}
                    </td>

                    {/* Category */}
                    <td className="px-2 py-2 truncate" title={reg.category}>
                      {reg.category}
                    </td>

                    {/* Status */}
                    <td className="px-1 py-2 text-center">
                      {reg.isApproved ? '✅' : '❌'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>

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

      <div className="flex justify-end items-center mt-6 mx-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Download PDF
        </button>
      </div>


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