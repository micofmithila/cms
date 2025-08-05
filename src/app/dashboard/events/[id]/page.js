'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import Link from 'next/link';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div className="p-6 text-center">Loading event...</div>;

  const {
    title,
    posterUrl,
    eventDate,
    eventTime,
    eventVenueAddress,
    registrationFee,
    status,
    isRegistrationOpen,
    desc
  } = event;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">{title}</h1>

      {/* Poster */}
      {posterUrl && (
        <img
          src={posterUrl}
          alt={title}
          className="max-w-full max-h-[600px] object-contain rounded-xl shadow-md mx-auto"
        />
      )}

      {/* Event Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl shadow-sm text-sm">
        <div><strong>Date:</strong> {(event.eventDate
          ? new Date(event.eventDate).toLocaleDateString()
          : "To Be Announced")}</div>
        <div><strong>Time:</strong> {(event.eventTime || "To Be Announced")}</div>
        <div><strong>Venue:</strong> {eventVenueAddress}</div>
        <div><strong>Registration Fee:</strong> {registrationFee === 0 ? 'Free' : `₹${registrationFee}`}</div>
        <div>
          <strong>Status:</strong>{' '}
          <span className={`font-semibold ${status === 'upcoming' ? 'text-green-600' : status === 'cancelled' ? 'text-red-600' : status === 'completed' ? 'text-gray-600' : 'text-yellow-500'}`}>
            {status}
          </span>
        </div>
        <div>
          <strong>Registration:</strong>{' '}
          {isRegistrationOpen ? (
            <span className="text-green-600 font-semibold">Open</span>
          ) : (
            <span className="text-red-600 font-semibold">Closed</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(desc || '')
          }}
        />
      </div>

      {/* Register Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Close Registration' : 'Register Now'}
        </button>
      </div>

      <div className="text-center">
        <Link href={`/dashboard/events/${event._id}/registration`}>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg shadow transition">
            📋 View Registrations
          </button>
        </Link>
      </div>


      {isRegistrationOpen && showForm && (
        <div className="bg-white p-6 mt-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Register for this Event</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = {
                name: e.target.name.value.trim(),
                email: e.target.email.value.trim(),
                phone: e.target.phone.value.trim(),
                category: e.target.category.value.trim(),
                age: e.target.age.value.trim(),
                socialLink: e.target.socialLink.value.trim(),
                otherQues: e.target.otherQues.value.trim(),
                contentLink: e.target.contentLink.value.trim()
              };

              try {
                const res = await fetch(`/api/events/${id}/register`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Registration failed');

                alert('Successfully registered!');
                setShowForm(false);
              } catch (err) {
                alert(err.message);
              }
            }}
            className="space-y-4"
          >
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'age', label: 'Age', type: 'number' },
              { name: 'socialLink', label: 'Social Link', type: 'url' },
              { name: 'otherQues', label: 'Other Questions', type: 'textarea' },
              { name: 'contentLink', label: 'Content Link (e.g., portfolio, video)', type: 'url' }
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                  {field.label} *
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}


    </div>
  );
};

export default EventDetails;
