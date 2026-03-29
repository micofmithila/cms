'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-5xl">🎤</p>
          <p className="text-xl font-semibold text-gray-700">Event not found</p>
          <p className="text-gray-400 text-sm">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const {
    title,
    posterUrl,
    eventDate,
    eventTime,
    eventVenueAddress,
    registrationFee,
    registrationOpeningDate,
    registrationClosingDate,
    status,
    isRegistrationOpen,
    desc,
    theme,
    chiefGuests,
  } = event;

  const handleRegisterClick = () => {
    if (!isRegistrationOpen) {
      toast.error('Registration is closed or not started.');
      return;
    }
    router.push(`/events/${id}/register`);
  };

  const statusConfig = {
    upcoming: { label: 'Upcoming', color: 'bg-green-100 text-green-700 border-green-200' },
    completed: { label: 'Completed', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600 border-red-200' },
    draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  };

  const currentStatus = statusConfig[status] || statusConfig.draft;

  const formattedEventDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })
    : null;

  const formattedRegOpen = registrationOpeningDate
    ? new Date(registrationOpeningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  const formattedRegClose = registrationClosingDate
    ? new Date(registrationClosingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* Hero Section */}
      <div className="relative w-full bg-gray-900 overflow-hidden flex justify-center">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={title}
            className="max-h-[520px] max-w-full object-contain opacity-40"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-20 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
            {isRegistrationOpen && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-700 border-blue-200 animate-pulse">
                Registration Open
              </span>
            )}
            {theme && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                🎨 {theme!='NA' ? theme : "No Theme"}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            {title}
          </h1>

          {formattedEventDate && (
            <p className="text-blue-200 mt-3 text-base font-medium">📅 {formattedEventDate}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Info Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: '⏰',
              label: 'Event Time',
              value: eventTime || 'To Be Announced',
            },
            {
              icon: '📍',
              label: 'Venue',
              value: eventVenueAddress || 'To Be Announced',
            },
            {
              icon: '💰',
              label: 'Registration Fee',
              value: registrationFee === 0 ? 'Free Entry' : `₹${registrationFee}`,
            },
            {
              icon: '📋',
              label: 'Registration',
              value: isRegistrationOpen ? 'Open Now' : 'Closed',
              highlight: isRegistrationOpen ? 'text-green-600' : 'text-red-500',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
              <p className={`text-sm font-semibold text-gray-800 ${item.highlight || ''}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Registration Dates */}
        {(formattedRegOpen || formattedRegClose) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Registration Window</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              {formattedRegOpen && (
                <div>
                  <p className="text-gray-400 text-xs">Opens</p>
                  <p className="font-semibold text-gray-800">{formattedRegOpen}</p>
                </div>
              )}
              {formattedRegClose && (
                <div>
                  <p className="text-gray-400 text-xs">Closes</p>
                  <p className="font-semibold text-gray-800">{formattedRegClose}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chief Guests */}
        {chiefGuests && chiefGuests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Chief Guests</h3>
            <div className="flex flex-wrap gap-2">
              {chiefGuests.map((guest, i) => (
                <span
                  key={i}
                  className="bg-purple-50 text-purple-700 border border-purple-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  ⭐ {guest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {desc && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">About This Event</h2>
            <div
              className="prose max-w-none text-gray-700 prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h2:text-xl prose-p:text-base prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}
            />
          </div>
        )}


        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-gray-800">Interested in joining?</p>
            <p className="text-sm text-gray-400 mt-0.5">
              {isRegistrationOpen
                ? 'Registration is open. Secure your spot now!'
                : 'Registration is currently closed for this event.'}
            </p>
          </div>

          <button
            onClick={handleRegisterClick}
            disabled={!isRegistrationOpen}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all shadow-md whitespace-nowrap ${isRegistrationOpen
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              }`}
          >
            {isRegistrationOpen ? 'Register Now →' : 'Registration Closed'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;