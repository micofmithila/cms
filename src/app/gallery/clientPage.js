'use client';

import LoadingSpinner from '@/components/Ui/LoadingSpinner';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { FiDownload, FiLink, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHero from '@/components/Ui/PageHero';

const PAGE_SIZE = 18;

export default function GalleryClient() {
  const [search, setSearch] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setGalleryItems(Array.isArray(data) ? data : []))
      .catch(() => setGalleryItems([]))
      .finally(() => setLoading(false));
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredImages = useMemo(() => {
    const lower = search.toLowerCase();
    return galleryItems.filter(
      (item) =>
        item.isPrivate === false &&
        (search === '' || item.tags?.join(' ').toLowerCase().includes(lower))
    );
  }, [galleryItems, search]);

  const totalPages = Math.ceil(filteredImages.length / PAGE_SIZE);

  const paginatedImages = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredImages.slice(start, start + PAGE_SIZE);
  }, [filteredImages, page]);

  const handleDownload = useCallback(async (url, id) => {
    setDownloading(id);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const now = new Date();
      const pad = (n) => n.toString().padStart(2, '0');
      const filename = `MOM_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.jpg`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success('Downloaded!');
    } catch {
      toast.error('Download failed.');
    } finally {
      setDownloading(null);
    }
  }, []);

  const handleCopyLink = useCallback((url) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <PageHero
        label="Our Gallery"
        title="Moments from"
        highlight="the Stage"
        description="A visual journey through our open mic events, performances, and cultural gatherings across Mithila."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Search */}
        <div className="relative max-w-sm mb-8">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by tag or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <LoadingSpinner />
          </div>
        )}

        {/* Empty */}
        {!loading && filteredImages.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center gap-3">
            <p className="text-5xl">📷</p>
            <p className="text-lg font-semibold text-gray-700">No images found</p>
            <p className="text-gray-400 text-sm">
              {search ? `No results for "${search}"` : 'No images available yet.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-sm text-purple-600 hover:underline mt-1"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && paginatedImages.length > 0 && (
          <>
            {/* Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredImages.length)} of {filteredImages.length} images
              </p>
            </div>

            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 space-y-3">
              {paginatedImages.map((item) => (
                <div
                  key={item._id}
                  className="group relative rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 break-inside-avoid"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.tags?.[0] || 'Gallery image'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                    {/* Tags */}
                    {item.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm truncate max-w-[80px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => handleDownload(item.imageUrl, item._id)}
                        disabled={downloading === item._id}
                        className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition shadow-sm"
                        title="Download"
                      >
                        {downloading === item._id ? (
                          <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiDownload size={12} />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyLink(item.imageUrl)}
                        className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition shadow-sm"
                        title="Copy link"
                      >
                        <FiLink size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Prev
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, idx) =>
                      p === '...' ? (
                        <span key={`dot-${idx}`} className="px-2 py-2 text-sm text-gray-400">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${page === p
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
                            }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                </div>

                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}