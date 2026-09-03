'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DEFAULT_VIDEO = { title: '', youtubeUrl: '', category: '' };
const DEFAULT_PERFORMER = { name: '', category: '', image: '', socials: { instagram: '', youtube: '' } };
const DEFAULT_REVIEW = { name: '', role: '', review: '' };

export default function HomepageSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeTab, setActiveTab] = useState('hero');

  const [heroImages, setHeroImages] = useState([]);
  const [heroInput, setHeroInput] = useState('');

  const [featuredEventId, setFeaturedEventId] = useState('');

  const [featuredImages, setFeaturedImages] = useState([]);

  const [featuredVideos, setFeaturedVideos] = useState([]);

  const [topPerformers, setTopPerformers] = useState([]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [settingsRes, eventsRes, galleryRes] = await Promise.all([
          fetch('/api/homepage'),
          fetch('/api/events'),
          fetch('/api/gallery'),
        ]);

        const settings = await settingsRes.json();
        const eventsData = await eventsRes.json();
        const galleryData = await galleryRes.json();

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setGalleryImages(Array.isArray(galleryData) ? galleryData : []);

        setHeroImages(settings.heroImages || []);
        setFeaturedEventId(settings.featuredEventId?._id || settings.featuredEventId || '');
        setFeaturedImages(
          (settings.featuredImages || []).map((img) => img._id || img)
        );
        setFeaturedVideos(settings.featuredVideos || []);
        setTopPerformers(settings.topPerformers || []);
        setReviews(settings.reviews || []);
      } catch (err) {
        toast.error('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroImages,
          featuredEventId: featuredEventId || null,
          featuredImages,
          featuredVideos,
          topPerformers,
          reviews,
        }),
      });

      if (!res.ok) throw new Error('Failed to save');
      toast.success('Homepage settings saved!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Generic helpers
  const addToList = (setter, item) => setter((prev) => [...prev, item]);
  const removeFromList = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));
  const updateInList = (setter, index, key, value) => {
    setter((prev) => {
      const updated = [...prev];
      if (typeof key === 'object') {
        updated[index] = { ...updated[index], ...key };
      } else {
        updated[index] = { ...updated[index], [key]: value };
      }
      return updated;
    });
  };

  const tabs = [
    { key: 'hero', label: '🖼️ Hero Images' },
    { key: 'event', label: '🌟 Featured Event' },
    { key: 'images', label: '📸 Featured Images' },
    { key: 'videos', label: '▶️ Featured Videos' },
    { key: 'performers', label: '🎤 Top Performers' },
    { key: 'reviews', label: '💬 Reviews' },
  ];

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Homepage Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Images */}
      {activeTab === 'hero' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">These images appear in the homepage hero slideshow.</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={heroInput}
              onChange={(e) => setHeroInput(e.target.value)}
              placeholder="Paste image URL..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={() => {
                if (!heroInput.trim()) return;
                addToList(setHeroImages, heroInput.trim());
                setHeroInput('');
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              + Add
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {heroImages.map((url, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-100">
                <img src={url} alt="" className="w-full h-28 object-cover" />
                <button
                  onClick={() => removeFromList(setHeroImages, i)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Event */}
      {activeTab === 'event' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Select the event to feature on the homepage.</p>
          <select
            value={featuredEventId}
            onChange={(e) => setFeaturedEventId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">— No featured event —</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title} ({ev.status})
              </option>
            ))}
          </select>
          {featuredEventId && (
            <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">
              ✅ Featured: {events.find((e) => e._id === featuredEventId)?.title || featuredEventId}
            </div>
          )}
        </div>
      )}

      {/* Featured Images */}
      {activeTab === 'images' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Select images from gallery to feature on the homepage.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {galleryImages.filter(img => !img.isPrivate).map((img) => {
              const selected = featuredImages.includes(img._id);
              return (
                <div
                  key={img._id}
                  onClick={() => {
                    setFeaturedImages((prev) =>
                      selected ? prev.filter((id) => id !== img._id) : [...prev, img._id]
                    );
                  }}
                  className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition ${selected ? 'border-purple-500' : 'border-transparent'
                    }`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-28 object-cover" />
                  {selected && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                      <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400">{featuredImages.length} image(s) selected</p>
        </div>
      )}

      {/* Featured Videos */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">YouTube videos to showcase on the homepage.</p>
          {featuredVideos.map((video, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">Video {i + 1}</p>
                <button onClick={() => removeFromList(setFeaturedVideos, i)} className="text-red-500 text-sm hover:underline">Remove</button>
              </div>
              <input
                type="text"
                value={video.title}
                onChange={(e) => updateInList(setFeaturedVideos, i, 'title', e.target.value)}
                placeholder="Video title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="url"
                value={video.youtubeUrl}
                onChange={(e) => updateInList(setFeaturedVideos, i, 'youtubeUrl', e.target.value)}
                placeholder="YouTube URL (e.g. https://youtube.com/watch?v=...)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                value={video.category}
                onChange={(e) => updateInList(setFeaturedVideos, i, 'category', e.target.value)}
                placeholder="Category (e.g. Poetry, Singing)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ))}
          <button
            onClick={() => addToList(setFeaturedVideos, { ...DEFAULT_VIDEO })}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            + Add Video
          </button>
        </div>
      )}

      {/* Top Performers */}
      {activeTab === 'performers' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Performers to showcase on the homepage.</p>
          {topPerformers.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">Performer {i + 1}</p>
                <button onClick={() => removeFromList(setTopPerformers, i)} className="text-red-500 text-sm hover:underline">Remove</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="text" value={p.name} onChange={(e) => updateInList(setTopPerformers, i, 'name', e.target.value)} placeholder="Name" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <input type="text" value={p.category} onChange={(e) => updateInList(setTopPerformers, i, 'category', e.target.value)} placeholder="Category (e.g. Poetry)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <input type="url" value={p.image} onChange={(e) => updateInList(setTopPerformers, i, 'image', e.target.value)} placeholder="Image URL" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 col-span-2" />
                <input type="url" value={p.socials?.instagram} onChange={(e) => updateInList(setTopPerformers, i, { socials: { ...p.socials, instagram: e.target.value } })} placeholder="Instagram URL" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <input type="url" value={p.socials?.youtube} onChange={(e) => updateInList(setTopPerformers, i, { socials: { ...p.socials, youtube: e.target.value } })} placeholder="YouTube URL" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              {p.image && (
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-full object-cover border border-gray-200 mt-1" />
              )}
            </div>
          ))}
          <button
            onClick={() => addToList(setTopPerformers, JSON.parse(JSON.stringify(DEFAULT_PERFORMER)))}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            + Add Performer
          </button>
        </div>
      )}

      {/* Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Audience reviews to show on the homepage.</p>
          {reviews.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">Review {i + 1}</p>
                <button onClick={() => removeFromList(setReviews, i)} className="text-red-500 text-sm hover:underline">Remove</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="text" value={r.name} onChange={(e) => updateInList(setReviews, i, 'name', e.target.value)} placeholder="Reviewer name" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <input type="text" value={r.role} onChange={(e) => updateInList(setReviews, i, 'role', e.target.value)} placeholder="Role (e.g. Audience, Performer)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <textarea value={r.review} onChange={(e) => updateInList(setReviews, i, 'review', e.target.value)} placeholder="Review text..." rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
          ))}
          <button
            onClick={() => addToList(setReviews, { ...DEFAULT_REVIEW })}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            + Add Review
          </button>
        </div>
      )}

      {/* Save button at bottom too */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

    </div>
  );
}