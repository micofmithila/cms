'use client';

import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import { FiDownload, FiLink } from 'react-icons/fi';

export default function GalleryClient() {
  const [search, setSearch] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch images');
        const data = await res.json();
        setGalleryItems(data);
      } catch (err) {
        console.error(err.message);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Filter private images first
  const publicImages = galleryItems.filter(item => item.isPrivate === false);

  // Then apply search filtering
  const filteredImages = publicImages.filter(item => {
    const searchableText = `${item.tags.join(' ')}`.toLowerCase();
    return searchableText.includes(search.toLowerCase());
  });

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const now = new Date();
      const pad = (num) => num.toString().padStart(2, '0');

      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const day = pad(now.getDate());
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());

      const formatted = `MOM_${year}${month}${day}_${hours}${minutes}${seconds}.jpg`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = formatted;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed.');
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('Image link copied to clipboard!');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          🎨 Gallery
        </h2>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-purple-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Image Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item._id}
                className="relative rounded-xl overflow-hidden group shadow-md"
              >
                <img
                  src={item.imageUrl}
                  alt="Gallery"
                  className="w-full h-64 object-cover transition duration-300 group-hover:brightness-90"
                />
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleDownload(item.imageUrl)}
                    className="bg-white/80 backdrop-blur px-2 py-1 rounded-full text-purple-700 hover:bg-white shadow"
                    title="Download"
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => handleCopyLink(item.imageUrl)}
                    className="bg-white/80 backdrop-blur px-2 py-1 rounded-full text-purple-700 hover:bg-white shadow"
                    title="Copy Link"
                  >
                    <FiLink />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredImages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No images found for this search.
          </p>
        )}
      </div>
    </section>
  );
}
