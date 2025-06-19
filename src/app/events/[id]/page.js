// app/events/[id]/page.js
import React from "react";


async function getEventData(id) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';  // Adjust for your environment

    const res = await fetch(`${baseUrl}/api/events?id=${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch event data");
    }

    return res.json();
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const event = await getEventData(id);
    return {
        title: `Events | ${event.title || "Untitled Event"}`,
        openGraph: {
            title: `Events | ${event.title || "Untitled Event"}`,
            images: [
                {
                    url: event.posterUrl || `${process.env.BASE_URL}/default-image.jpg`, // Fallback image
                    width: 800,
                    height: 600,
                },
            ],
        },
    };
}


export default async function EventDetailsPage({ params }) {
    const { id } = await params;
    const event = await getEventData(id);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="p-4 bg-white rounded shadow-md space-y-3">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900">{event.title || "Untitled Event"}</h2>

                {/* Poster Image */}
                {event.posterUrl && (
                    <div>
                        <strong>Poster:</strong>
                        <img src={event.posterUrl} alt="Event Poster" className="w-full max-w-md mt-2 rounded" />
                    </div>
                )}

                {/* Images Array */}
                {event.imagesArray?.length > 0 && (
                    <div>
                        <strong>Images:</strong>
                        <div className="flex gap-2 mt-2 overflow-x-auto">
                            {event.imagesArray.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Theme */}
                <p className="text-gray-700">
                    <strong>Theme:</strong> {event.theme || "No theme specified"}
                </p>

                {/* Chief Guests */}
                {event.chiefGuests?.length > 0 && (
                    <p className="text-gray-700">
                        <strong>Chief Guests:</strong> {event.chiefGuests.join(", ")}
                    </p>
                )}

                {/* Registration Limit */}
                <p className="text-gray-700">
                    <strong>Registration Limit:</strong> {event.registrationLimit || "No limit"}
                </p>

                {/* Registration Fee */}
                <p className="text-gray-700">
                    <strong>Registration Fee:</strong>{" "}
                    {event.registrationFee === 0 ? "Free" : `₹${event.registrationFee}`}
                </p>

                {/* Registration Link */}
                {event.registrationLink && (
                    <p className="text-blue-600">
                        <strong>Registration Link:</strong>{" "}
                        <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            {event.registrationLink}
                        </a>
                    </p>
                )}

                {/* Registration Opening Date */}
                <p className="text-gray-700">
                    <strong>Registration Opens:</strong>{" "}
                    {event.registrationOpeningDate
                        ? new Date(event.registrationOpeningDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Not specified"}
                </p>

                {/* Registration Closing Date */}
                <p className="text-gray-700">
                    <strong>Registration Closes:</strong>{" "}
                    {event.registrationClosingDate
                        ? new Date(event.registrationClosingDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Not specified"}
                </p>

                {/* Event Date */}
                <p className="text-gray-700">
                    <strong>Event Date:</strong>{" "}
                    {event.eventDate
                        ? new Date(event.eventDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Date not available"}
                </p>

                {/* Event Time */}
                <p className="text-gray-700">
                    <strong>Event Time:</strong>{" "}
                    {event.eventTime
                        ? new Date(`1970-01-01T${event.eventTime}`).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })
                        : "Time not available"}
                </p>

                {/* Venue */}
                <p className="text-gray-700">
                    <strong>Venue:</strong> {event.eventVenueAddress || "Venue not specified"}
                </p>

                {/* Status */}
                <p className="text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{event.status || "draft"}</span>
                </p>
                {/* Description (HTML content) */}
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: event.desc }}
                />
            </div>
        </div>
    );
}
