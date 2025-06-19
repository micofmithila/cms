'use client'
import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import Link from "next/link";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div>
      {/* Create Event Button */}
      <div className="flex justify-end my-6">
        <Link
          href="/dashboard/events/create"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-5 py-3 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-4 sm:p-10">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;