"use client";

import { useState } from "react";
import { FiDownload, FiLink } from "react-icons/fi";

export const metadata = {
  title: 'Gallery | MIC of Mithila',
  description: 'Discover visual moments captured from our open mic events in Madhubani.',
};

const dummyGallery = [
  {
    "_id": "6853058e7e453191c7dcd8af",
    "title": "ep3",
    "description": ".",
    "tags": [],
    "relatedEvents": [],
    "uploadedBy": "68033c401f4d651a19d44f0f",
    "category": ".",
    "featured": false,
    "imageUrls": [
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271374/micofmithila/gallery/kcdk6izk5jdyyk2o9p3k.jpg"
    ],
    "createdAt": "2025-06-18T18:29:34.940Z",
    "__v": 0
  },
  {
    "_id": "685305797e453191c7dcd8ad",
    "title": "crew",
    "description": ".",
    "tags": [],
    "relatedEvents": [],
    "uploadedBy": "68033c401f4d651a19d44f0f",
    "category": ".",
    "featured": false,
    "imageUrls": [
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271350/micofmithila/gallery/pf2glqwzgeuyqokyuyb5.jpg",
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271351/micofmithila/gallery/xjkxedb1uoagparkzfqc.jpg"
    ],
    "createdAt": "2025-06-18T18:29:13.021Z",
    "__v": 0
  },
  {
    "_id": "6852ff497e453191c7dcd899",
    "title": "past events",
    "description": ".",
    "tags": [],
    "relatedEvents": [],
    "uploadedBy": "68033c401f4d651a19d44f0f",
    "category": ".",
    "featured": false,
    "imageUrls": [
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1750269768/micofmithila/gallery/rr7vfui7l1zgmalksrdf.jpg"
    ],
    "createdAt": "2025-06-18T18:02:49.590Z",
    "__v": 0
  },
  {
    "_id": "6826f2181ed047b0222bf48c",
    "title": "Episode 3 Poster",
    "description": "Episode 3 Poster",
    "tags": [
      "episode3",
      "mom",
      "micofmithila",
      "motherhood",
      "mothersday",
      "18may",
      "poster"
    ],
    "relatedEvents": [],
    "uploadedBy": "681b178c55f253c8989a0a47",
    "category": "na",
    "featured": false,
    "imageUrls": [
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1747382806/micofmithila/gallery/egss5900jbk7aq6t7xbm.jpg"
    ],
    "createdAt": "2025-05-16T08:06:48.528Z",
    "__v": 0
  }
];

export default function GalleryPage() {
  const [search, setSearch] = useState("");

  const filteredImages = dummyGallery.filter(item => {
    const text = `${item.title} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "mic-of-mithila-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Image link copied to clipboard!");
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
            placeholder="Search by tag, title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-purple-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.flatMap((item) =>
            item.imageUrls.map((url, idx) => (
              <div
                key={`${item._id}-${idx}`}
                className="relative rounded-xl overflow-hidden group shadow-md"
              >
                <img
                  src={url}
                  alt="Gallery"
                  className="w-full h-64 object-cover transition duration-300 group-hover:brightness-90"
                />
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleDownload(url)}
                    className="bg-white/80 backdrop-blur px-2 py-1 rounded-full text-purple-700 hover:bg-white shadow"
                    title="Download"
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => handleCopyLink(url)}
                    className="bg-white/80 backdrop-blur px-2 py-1 rounded-full text-purple-700 hover:bg-white shadow"
                    title="Copy Link"
                  >
                    <FiLink />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No images found for this search.
          </p>
        )}
      </div>
    </section>
  );
}
