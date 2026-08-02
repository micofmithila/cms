'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error('Failed to fetch event:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const formattedEventDate = useMemo(() => {
    if (!event?.eventDate) return null;
    return new Date(event.eventDate).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric', weekday: 'long',
    });
  }, [event?.eventDate]);

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-5xl">🎤</p>
          <p className="text-xl font-semibold text-gray-700">Event not found</p>
          <p className="text-gray-400 text-sm">This event doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const {
    title, posterUrl, eventDate, eventTime,
    eventVenueAddress, registrationFee, status,
    isRegistrationOpen, desc, theme, chiefGuests,
    performerCategories,
  } = event;

  const isAnyOpen = isRegistrationOpen?.performer || isRegistrationOpen?.audience;

  const handleRegisterClick = () => {
    if (!isAnyOpen) {
      toast.error('Registration is closed for this event.');
      return;
    }
    router.push(`/dashboard/events/${id}/register`);
  };

  const statusConfig = {
    upcoming:  { label: 'Upcoming',  color: 'bg-green-100 text-green-700' },
    completed: { label: 'Completed', color: 'bg-gray-100 text-gray-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600' },
    draft:     { label: 'Draft',     color: 'bg-yellow-100 text-yellow-700' },
  };

  const currentStatus = statusConfig[status] || statusConfig.draft;

  const infoItems = [
    { icon: '⏰', label: 'Time',   value: eventTime || 'To Be Announced' },
    { icon: '📍', label: 'Venue',  value: eventVenueAddress || 'To Be Announced' },
    { icon: '💰', label: 'Fee',    value: registrationFee === 0 ? 'Free Entry' : `₹${registrationFee}` },
    {
      icon: '📋',
      label: 'Registration',
      value: isAnyOpen ? 'Open Now' : 'Closed',
      highlight: isAnyOpen ? 'text-green-600' : 'text-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Poster — full width, no overlay, no content hidden */}
      {posterUrl && (
        <div className="w-full bg-gray-900 flex justify-center">
          <img
            src={posterUrl}
            alt={title}
            loading="eager"
            decoding="async"
            className="w-full max-w-2xl object-contain"
          />
        </div>
      )}

      {/* Page content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* Title + badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
            {isAnyOpen && (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Registration Open
              </span>
            )}
            {theme && theme !== 'NA' && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                🎨 {theme}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>

          {formattedEventDate && (
            <p className="text-sm text-gray-500 font-medium">📅 {formattedEventDate}</p>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm flex flex-col gap-1"
            >
              <span className="text-xl">{item.icon}</span>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{item.label}</p>
              <p className={`text-xs font-semibold text-gray-800 leading-snug ${item.highlight || ''}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Registration type badges */}
        {(isRegistrationOpen?.performer || isRegistrationOpen?.audience) && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Open For</p>
            <div className="flex flex-wrap gap-2">
              {isRegistrationOpen?.performer && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  🎤 Performers
                </span>
              )}
              {isRegistrationOpen?.audience && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  👥 Audience
                </span>
              )}
            </div>
          </div>
        )}

        {/* Performer categories */}
        {performerCategories?.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Performance Categories</p>
            <div className="flex flex-wrap gap-2">
              {performerCategories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chief Guests */}
        {chiefGuests?.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Chief Guests</p>
            <div className="flex flex-wrap gap-2">
              {chiefGuests.map((guest, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100"
                >
                  ⭐ {guest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description — full width, smaller text */}
        {desc && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 w-full">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">About This Event</p>
            <div
              className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none
                prose-p:text-sm prose-p:text-gray-600 prose-p:leading-relaxed
                prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
                prose-strong:text-gray-700"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-base font-bold text-gray-800">
              {isAnyOpen ? 'Secure your spot!' : 'Registration Closed'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isAnyOpen
                ? 'Registration is open. Join us for an amazing experience.'
                : 'Registration for this event is currently closed.'}
            </p>
          </div>
          <button
            onClick={handleRegisterClick}
            disabled={!isAnyOpen}
            className={`px-7 py-2.5 rounded-xl font-semibold text-sm text-white transition-all whitespace-nowrap ${
              isAnyOpen
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 shadow-sm'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAnyOpen ? 'Register Now →' : 'Closed'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;