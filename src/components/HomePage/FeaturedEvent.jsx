import Link from "next/link";

export default function FeaturedEventSection({ event }) {
  if (!event) {
    return (
      <section className="py-16 px-4 md:px-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">🌟 Featured Event</h2>
        <p className="text-lg text-gray-500">No featured event for now. Stay tuned!</p>
      </section>
    );
  }

  const eventDate = (event.eventDate ? new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) : "To be announced");

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          🌟 Featured Event
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-200">
          <div className="w-full md:w-1/2">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="rounded-2xl shadow-md w-full max-h-[500px] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500">🗓️ {eventDate}</p>
            <p className="text-sm text-gray-500">🕒 {(event.eventTime || "To Be Announced")}</p>
            <p className="text-sm text-gray-500">📍 {event.eventVenueAddress}</p>
            

            <div
              className="text-base text-gray-700 leading-relaxed max-h-44 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: event.desc || "" }}
            />

            <div className="pt-4 w-full">
              <Link href={`/events/${event._id}`}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-2 rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition">
                  {event.isRegistrationOpen ? 'Register Now' : 'View Event'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
