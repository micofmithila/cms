import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function TopPerformersSection({ performers = [] }) {
  if (performers.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Top Performers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Faces Behind the Mic
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Celebrating the talented artists who have graced our stage.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {performers.map((performer, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-purple-100 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image container */}
              <div className="relative overflow-hidden">
                <img
                  src={performer.image}
                  alt={performer.name}
                  className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Category badge over image */}
                <span className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {performer.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-snug">
                  {performer.name}
                </h3>

                {/* Social links */}
                {performer.socials && (
                  <div className="flex gap-3 mt-3 text-gray-400">
                    {performer.socials.instagram && (
                      <a
                        href={performer.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition-colors duration-200"
                      >
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {performer.socials.youtube && (
                      <a
                        href={performer.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        <FaYoutube size={16} />
                      </a>
                    )}
                    {performer.socials.twitter && (
                      <a
                        href={performer.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200"
                      >
                        <FaTwitter size={16} />
                      </a>
                    )}
                    {performer.socials.linkedin && (
                      <a
                        href={performer.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition-colors duration-200"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}