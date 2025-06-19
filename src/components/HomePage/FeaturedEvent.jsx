import Link from "next/link";

export default function FeaturedEventSection({ event }) {
  const eventDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          🌟 Featured Event
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-200">
          {/* Event Poster */}
          <div className="w-full md:w-1/2">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="rounded-2xl shadow-md w-full max-h-[500px] object-cover"
            />
          </div>

          {/* Event Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500">📅 {eventDate}</p>
            <div
              className="text-base text-gray-700 leading-relaxed max-h-44 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/events/${event._id}`}>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-2 rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition">
                  View Details
                </button>
              </Link>

              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-full shadow transition">
                    Register Now
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
