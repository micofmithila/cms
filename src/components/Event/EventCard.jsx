'use client';
import React, { useMemo } from "react";
import Link from "next/link";

const statusConfig = {
  upcoming:  { label: 'Upcoming',  classes: 'bg-green-100 text-green-700' },
  completed: { label: 'Completed', classes: 'bg-gray-100 text-gray-500' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-600' },
  draft:     { label: 'Draft',     classes: 'bg-yellow-100 text-yellow-700' },
};

const EventCard = ({ event }) => {
  // Strip HTML tags without DOMPurify for a plain text preview — faster
  const plainDesc = useMemo(() => {
    if (!event.desc) return '';
    return event.desc.replace(/<[^>]*>/g, '').slice(0, 120);
  }, [event.desc]);

  const formattedDate = useMemo(() => {
    if (!event.eventDate) return 'To Be Announced';
    return new Date(event.eventDate).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  }, [event.eventDate]);

  const status = statusConfig[event.status] || statusConfig.upcoming;
  const isFree = Number(event.registrationFee) === 0;
  const isAnyOpen = event.isRegistrationOpen?.performer || event.isRegistrationOpen?.audience;

  return (
    <Link href={`/events/${event._id}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-shadow duration-200 overflow-hidden flex flex-col h-full">

        {/* Poster */}
        <div className="bg-gray-100 overflow-hidden">
          <img
            src={event.posterUrl}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="w-full object-contain max-h-[300px] group-hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 gap-2.5">

          {/* Badge row */}
          <div className="flex flex-wrap gap-1.5">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.classes}`}>
              {status.label}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {isFree ? 'Free' : `₹${event.registrationFee}`}
            </span>
            {isAnyOpen && (
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-base font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
            {event.title}
          </h2>

          {/* Meta */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>🗓️ {formattedDate}</p>
            <p>🕒 {event.eventTime || 'TBA'}</p>
            <p className="line-clamp-1">📍 {event.eventVenueAddress}</p>
          </div>

          {/* Description preview */}
          {plainDesc && (
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {plainDesc}
            </p>
          )}

          {/* Categories */}
          {event.performerCategories?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {event.performerCategories.slice(0, 3).map((cat) => (
                <span key={cat} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">
                  {cat}
                </span>
              ))}
              {event.performerCategories.length > 3 && (
                <span className="text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded-full">
                  +{event.performerCategories.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* CTA */}
          <div className={`w-full mt-1 py-2 rounded-lg text-sm font-semibold text-center text-white transition-opacity ${
            isAnyOpen
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90'
              : 'bg-gray-800 group-hover:opacity-90'
          }`}>
            {isAnyOpen ? 'Register Now →' : 'View Event →'}
          </div>

        </div>
      </div>
    </Link>
  );
};

export default EventCard;