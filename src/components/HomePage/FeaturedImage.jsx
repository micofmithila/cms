export default function FeaturedImagesSection({ images = [] }) {
    return (
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
            📸 Featured Images
          </h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {images.map((url, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={url}
                  alt={`Featured Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
  
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition duration-300">
                  <a
                    href={url}
                    download
                    className="bg-white text-sm font-medium text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-200"
                  >
                    Download
                  </a>
                  {/* <button
                    onClick={() => navigator.clipboard.writeText(url)}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-blue-700"
                  >
                    Copy Link
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  