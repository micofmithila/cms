'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import toast from 'react-hot-toast';
import Link from 'next/link';

const PERFORMER_CATEGORIES = [
  'Poetry',
  'Storytelling',
  'Singing',
  'Rapsong',
  'Beatboxing',
  'Mimicry',
  'Stand-up Comedy',
];

const RegisterPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState('performer'); // 'performer' | 'audience'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contentFile, setContentFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [consent, setConsent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();

        if (!data.isRegistrationOpen) {
          toast.error('Registration is closed for this event.');
          router.push(`/events/${id}`);
          return;
        }

        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        toast.error('Failed to load event details.');
        router.push('/events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    setSelectedCategory('');
    setContentFile(null);
    setFileName('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContentFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = tab === 'audience' ? 'Audience' : selectedCategory;

    if (!category) {
      toast.error('Please select a category.');
      return;
    }

    if (tab === 'performer' && !contentFile) {
      toast.error('Please upload your content.');
      return;
    }

    const formData = new FormData();
    formData.append('name', e.target.name.value.trim());
    formData.append('email', e.target.email.value.trim());
    formData.append('phone', e.target.phone.value.trim());
    formData.append('category', category);
    formData.append('age', e.target.age.value.trim());
    formData.append('address', e.target.address.value.trim());
    formData.append('socialLink', e.target.socialLink?.value?.trim() || '');
    formData.append('howKnowAboutMic', e.target.howKnowAboutMic.value.trim());
    formData.append('anyQues', e.target.anyQues?.value?.trim() || '');

    if (tab === 'performer') {
      formData.append('contentFile', contentFile);
    }

    setSubmitting(true);
    setProgress(0);

    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.error || 'Registration failed'));
            } catch {
              reject(new Error('Registration failed'));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error. Please try again.')));
        xhr.addEventListener('abort', () => reject(new Error('Upload was aborted.')));

        xhr.open('POST', `/api/events/${id}/register`);
        xhr.send(formData);
      });

      setProgress(100);

      sessionStorage.setItem('registrationData', JSON.stringify({
        eventTitle: event.title,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        eventVenueAddress: event.eventVenueAddress,
        tab,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        category: formData.get('category'),
        age: formData.get('age'),
        address: formData.get('address'),
        socialLink: formData.get('socialLink'),
        howKnowAboutMic: formData.get('howKnowAboutMic'),
        anyQues: formData.get('anyQues'),
      }));

      toast.success('Successfully registered! 🎉');

      // Small delay to ensure sessionStorage write completes before navigation
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push(`/events/${id}/register/thankyou`);
    } catch (err) {
      toast.error(err.message);
      setProgress(0);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return null;

  const commonFields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'howKnowAboutMic', label: 'How did you hear about MIC of Mithila?', type: 'text', required: true },
    { name: 'socialLink', label: 'Social Link (Instagram, YouTube)', type: 'url', required: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link
          href={`/events/${id}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition"
        >
          ← Back to Event
        </Link>

        {/* Event summary card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">Registering for</p>
          <h1 className="text-xl font-bold text-gray-800">{event.title}</h1>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
            <span>📅 {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBA'}</span>
            <span>⏰ {event.eventTime || 'TBA'}</span>
            <span>📍 {event.eventVenueAddress}</span>
            <span>💰 {event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}</span>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 mb-6 flex gap-1.5">
          <button
            type="button"
            onClick={() => handleTabSwitch('performer')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'performer'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            🎤 Register as Performer
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('audience')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'audience'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            👥 Register as Audience
          </button>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {/* Tab description */}
          <div className={`mb-6 p-4 rounded-xl border ${tab === 'performer'
            ? 'bg-blue-50 border-blue-100'
            : 'bg-purple-50 border-purple-100'
            }`}>
            {tab === 'performer' ? (
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-0.5">Performer Registration</p>
                <p className="text-xs text-blue-500">Select your performance category and upload your content. Our team will review and get back to you.</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-purple-700 mb-0.5">Audience Registration</p>
                <p className="text-xs text-purple-500">You're registering as audience. No performance required — just show up and enjoy!</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Common fields */}
            {commonFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required
                    ? <span className="text-red-500 ml-1">*</span>
                    : <span className="text-gray-400 ml-1 text-xs">(optional)</span>
                  }
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            ))}

            {/* --- PERFORMER ONLY fields --- */}
            {tab === 'performer' && (
              <>
                {/* Category select */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Performance Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="">Select your performance category</option>
                    {PERFORMER_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Content upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Your Content <span className="text-red-500">*</span>
                    <span className="text-gray-400 ml-1 text-xs">(script / audio / video / PDF)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-5 text-center hover:border-purple-300 transition">
                    <input
                      type="file"
                      accept="image/*,video/*,audio/*,application/pdf"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="contentFile"
                    />
                    <label htmlFor="contentFile" className="cursor-pointer">
                      {fileName ? (
                        <div className="space-y-1">
                          <p className="text-2xl">📎</p>
                          <p className="text-sm font-medium text-purple-600">{fileName}</p>
                          <p className="text-xs text-gray-400">Click to change file</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-2xl">☁️</p>
                          <p className="text-sm font-medium text-gray-600">Click to upload your content</p>
                          <p className="text-xs text-gray-400">PDF, Audio, Video, or Image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Any question — performer only */}
                <div>
                  <label htmlFor="anyQues" className="block text-sm font-medium text-gray-700 mb-1">
                    Any Question? <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="anyQues"
                    name="anyQues"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="Write anything you'd like to ask..."
                  />
                </div>
              </>
            )}

            {/* --- AUDIENCE ONLY fields --- */}
            {tab === 'audience' && (
              <>
                {/* Fixed category display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 flex items-center gap-2">
                    <span>👥</span>
                    <span>Audience</span>
                    <span className="ml-auto text-xs text-gray-400">Fixed</span>
                  </div>
                  {/* Hidden input to carry value */}
                  <input type="hidden" name="category" value="Audience" />
                </div>

                {/* Any question — audience */}
                <div>
                  <label htmlFor="anyQues" className="block text-sm font-medium text-gray-700 mb-1">
                    Any Question? <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="anyQues"
                    name="anyQues"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="Write anything you'd like to ask..."
                  />
                </div>
              </>
            )}

            {/* Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${consent
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-purple-600'
                      : 'border-gray-300 bg-white group-hover:border-purple-400'
                      }`}
                  >
                    {consent && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  I consent to MIC of Mithila collecting and storing the information I have provided in this form —
                  including my name, email, phone number, age, address, and social links — for the purpose of
                  event registration and communication. I understand this information will only be used by the
                  MIC of Mithila team and will not be shared with third parties.
                </p>
              </label>
            </div>

            {/* Progress bar */}
            {submitting && (
              <div className="pt-2 space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{progress < 100 ? 'Uploading...' : 'Processing...'}</span>
                  <span className="font-semibold text-purple-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {progress === 100 && (
                  <p className="text-xs text-center text-purple-500 animate-pulse">
                    Finalizing your registration...
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting || !consent}
                className={`w-full py-3 rounded-xl font-semibold text-white transition shadow-md ${submitting || !consent
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
              >
                {submitting ? `Submitting... ${progress}%` : tab === 'performer' ? 'Submit Performer Registration' : 'Submit Audience Registration'}
              </button>
              {!consent && !submitting && (
                <p className="text-xs text-center text-gray-400 mt-2">
                  Please accept the consent above to submit your registration.
                </p>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;