'use client';
import React, { useEffect, useState } from "react";
import EventCard from "@/components/Event/EventCard";
import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import PageHero from "@/components/Ui/PageHero";

const EventsClient = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* Header */}
      <PageHero
        label="Explore Events"
        title="Our"
        highlight="Events"
        description="Discover open mic events, creative performances, and cultural gatherings in the heart of Mithila."
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center space-y-3">
            <p className="text-6xl">🎤</p>
            <p className="text-xl font-semibold text-gray-700">No events yet</p>
            <p className="text-gray-400 text-sm">
              Check back soon for upcoming open mic events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default EventsClient;