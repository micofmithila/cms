'use client'
import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-4 sm:p-10">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;