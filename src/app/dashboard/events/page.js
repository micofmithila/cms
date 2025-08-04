'use client';
import React, { useEffect, useState } from 'react';
import EventCardAdmin from '@/components/Event/EventCardAdmin';
import Link from 'next/link';

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Failed to fetch events', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Events</h1>
        <Link
          href="/dashboard/events/create"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:from-blue-700 hover:to-purple-700 transition duration-200"
        >
          + Create Event
        </Link>
      </div>

      {/* Event Cards Grid */}
      {events.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCardAdmin key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center text-gray-500 dark:text-gray-300 text-lg">
          No events found. Start by creating a new event.
        </div>
      )}
    </div>
  );
}