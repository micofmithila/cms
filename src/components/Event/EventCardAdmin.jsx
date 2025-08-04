'use client';
import React from 'react';
import DOMPurify from 'dompurify';
import Link from 'next/link';

const AdminEventCard = ({ event }) => {
  const cleanHTML = DOMPurify.sanitize(event.desc || '');

  const formattedEventDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString()
    : 'To Be Announced';

  const formattedTime = event.eventTime || 'To Be Announced';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto hover:shadow-xl transition-all duration-300 relative">
      {/* Top Left - Registration Fee */}
      <div className="absolute top-3 left-3 bg-white bg-opacity-80 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow">
        💸 {Number(event.registrationFee) === 0 ? 'Free' : `₹${event.registrationFee}`}
      </div>

      {/* Top Right - Status */}
      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
        {event.status || 'Upcoming'}
      </div>

      <img
        src={event.posterUrl}
        alt={event.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-sm text-gray-500 mb-1">📅 {formattedEventDate}</p>
        <p className="text-sm text-gray-500 mb-4">🕒 {formattedTime}</p>

        <div
          className="text-sm text-gray-700 line-clamp-4"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        ></div>

        {/* Admin Controls */}
        <div className="mt-4 text-center">
          <Link href={`/dashboard/events/${event._id}`}>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
              View Event
            </button>
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href={`/dashboard/events/${event._id}/edit`}>
            <button className="w-full bg-yellow-500 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
              Edit Event
            </button>
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href={`/dashboard/events/${event._id}/registration`}>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-6 py-2 rounded-lg shadow transition">
              View Registrations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCard;