export default function FeaturedImagesSection({ images = [] }) {
  if (images.length === 0) return null;

  // Assign span classes based on position for a dynamic masonry-like feel
  const getSpanClass = (index) => {
    const pattern = index % 6;
    if (pattern === 0) return "col-span-2 row-span-2"; // large
    if (pattern === 3) return "col-span-2 row-span-1"; // wide
    return "col-span-1 row-span-1";                    // normal
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Featured Images
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Moments captured from our open mic events across Mithila.
          </p>
        </div>

        {/* Desktop grid — masonry-like pattern */}
        <div className="hidden sm:grid grid-cols-4 auto-rows-[180px] gap-3">
          {images.map((url, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${getSpanClass(index)}`}
            >
              <img
                src={url}
                alt={`Featured Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Mobile grid — 2 columns, equal squares */}
        <div className="grid sm:hidden grid-cols-2 gap-2.5">
          {images.map((url, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl shadow-sm ${index === 0 ? "col-span-2 h-52" : "h-36"
                }`}
            >
              <img
                src={url}
                alt={`Featured Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-purple-300 hover:text-purple-600 bg-white transition shadow-sm hover:shadow">
            View Full Gallery
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}