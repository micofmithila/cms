export default function AudienceReviews({ reviews = [] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            What People Say
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Voices from our audience and performers who've experienced MIC of Mithila.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
            >
              {/* Quote mark */}
              <div>
                <span className="text-5xl font-serif leading-none text-purple-100 select-none">
                  "
                </span>
                <p className="text-gray-600 text-sm leading-relaxed -mt-3">
                  {r.review}
                </p>
              </div>

              {/* Divider */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* Avatar initials */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {r.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{r.name}</p>
                  {r.role && (
                    <p className="text-xs text-purple-500 font-medium">{r.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}