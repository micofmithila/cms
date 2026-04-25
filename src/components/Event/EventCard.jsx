'use client';
import React from "react";
import DOMPurify from "dompurify";
import Link from "next/link";

const statusConfig = {
  upcoming:  { label: 'Upcoming',  classes: 'bg-green-100 text-green-700 border-green-200' },
  completed: { label: 'Completed', classes: 'bg-gray-100 text-gray-600 border-gray-200' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-600 border-red-200' },
  draft:     { label: 'Draft',     classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
};

const EventCard = ({ event }) => {
  const cleanHTML = DOMPurify.sanitize(event.desc || "");

  const formattedEventDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "To Be Announced";

  const formattedTime = event.eventTime || "To Be Announced";
  const status = statusConfig[event.status] || statusConfig.upcoming;

  const isAnyRegistrationOpen =
    event.isRegistrationOpen?.performer || event.isRegistrationOpen?.audience;

  return (
    <Link href={`/events/${event._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-purple-100 transition-all duration-300 flex flex-col h-full">

        {/* Poster — clean, no overlays */}
        <div className="overflow-hidden bg-gray-100">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full object-contain max-h-[340px] group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 space-y-3">

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status */}
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.classes}`}>
              {status.label}
            </span>

            {/* Fee */}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-gray-50 text-gray-600 border-gray-200">
              {Number(event.registrationFee) === 0 ? "🎟️ Free" : `💰 ₹${event.registrationFee}`}
            </span>

            {/* Registration open */}
            {isAnyRegistrationOpen && (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
            {event.title}
          </h2>

          {/* Theme */}
          {event.theme && event.theme !== 'NA' && (
            <span className="inline-block self-start text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100 px-2.5 py-1 rounded-full">
              🎨 {event.theme}
            </span>
          )}

          {/* Info rows */}
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>🗓️</span>
              <span>{formattedEventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕒</span>
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="line-clamp-1">{event.eventVenueAddress}</span>
            </div>
          </div>

          {/* Description */}
          {cleanHTML && (
            <div
              className="text-xs text-gray-400 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
          )}

          {/* Performer categories */}
          {event.performerCategories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.performerCategories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
              {event.performerCategories.length > 3 && (
                <span className="text-xs bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full">
                  +{event.performerCategories.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA Button */}
          <button
            className={`w-full mt-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-sm ${
              isAnyRegistrationOpen
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-md'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {isAnyRegistrationOpen ? 'Register Now →' : 'View Event →'}
          </button>

        </div>
      </div>
    </Link>
  );
};

export default EventCard;