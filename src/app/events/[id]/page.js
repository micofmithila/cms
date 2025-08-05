'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [contentFile, setContentFile] = useState(null);
  const [fileName, setFileName] = useState('');


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
    desc,
  } = event;

  const handleFormToggle = () => {
    if (!isRegistrationOpen) {
      alert('Registration is closed or not started.');
      return;
    }
    setShowForm((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContentFile(file);
      setFileName(file.name);
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">{title}</h1>

      {posterUrl && (
        <img
          src={posterUrl}
          alt={title}
          className="max-w-full max-h-[600px] object-contain rounded-xl shadow-md mx-auto"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl shadow-sm text-sm">
        <div><strong>Date:</strong> {(eventDate
          ? new Date(event.eventDate).toLocaleDateString()
          : "To Be Announced")}</div>
        <div><strong>Time:</strong> {(eventTime || "To Be Announced")}</div>
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

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div
          className="prose max-w-none prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h2:text-xl prose-p:text-base"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc || '') }}
        />
      </div>

      {/* Register Button */}
      <div className="text-center">
        <button
          onClick={handleFormToggle}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registration Form
        </button>
      </div>

      {isRegistrationOpen && showForm && (
        <div className="bg-white p-6 mt-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Register for this Event</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!contentFile) {
                alert('Please upload your content.');
                return;
              }
              const formData = new FormData();
              formData.append('name', e.target.name.value.trim());
              formData.append('email', e.target.email.value.trim());
              formData.append('phone', e.target.phone.value.trim());
              formData.append('category', e.target.category.value.trim());
              formData.append('age', e.target.age.value.trim());
              formData.append('address', e.target.address.value.trim());
              formData.append('socialLink', e.target.socialLink.value.trim());
              formData.append('howKnowAboutMic', e.target.howKnowAboutMic.value.trim());
              formData.append('anyQues', e.target.anyQues.value.trim());
              formData.append('contentFile', contentFile);

              try {
                const res = await fetch(`/api/events/${id}/register`, {
                  method: 'POST',
                  body: formData
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
              {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: [
                  'Poetry',
                  'Storytelling',
                  'Singing',
                  'Rapsong',
                  'Beatboxing',
                  'Mimicry',
                  'Stand-up Comedy',
                  'Audience'
                ]
              },
              { name: 'age', label: 'Age', type: 'number' },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'socialLink', label: 'Social Link (Instagram, YouTube)', type: 'url' },
              { name: 'howKnowAboutMic', label: 'How did you hear about Mic of Mithila?', type: 'text' }
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                  {field.label} *
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                  >
                    <option value="">Select a category</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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


            {/* Optional Question */}
            <div>
              <label htmlFor="anyQues" className="block text-sm font-medium mb-1">
                Any Question (optional)
              </label>
              <textarea
                id="anyQues"
                name="anyQues"
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Your Content (script) *
              </label>
              <input
                type="file"
                accept="image/*,video/*,audio/*,application/pdf"
                required
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {fileName && (
                <p className="text-sm text-gray-500 mt-1">Selected: {fileName}</p>
              )}
            </div>


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