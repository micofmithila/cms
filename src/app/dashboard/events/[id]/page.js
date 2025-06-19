'use client'
// app/events/[id]/page.js
import React, { useState } from "react";


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

export default async function EditEventPage({ params }) {
    const { id } = await params;
    const event = await getEventData(id);
    return <EditEventClient event={event} />;
}

function EditEventClient({ event }) {
    const [editMode, setEditMode] = useState(false);

    const handleToggleEdit = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Top buttons */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Event Details</h1>
                <div className="space-x-2">
                    <button
                        onClick={handleToggleEdit}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        {editMode ? "Cancel Edit" : "Edit"}
                    </button>
                    <button
                        onClick={() => alert("Delete action not implemented yet.")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="p-4 bg-white rounded shadow-md space-y-3">
                {editMode ? (
                    // 🔧 Edit Mode (Form)
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            defaultValue={event.title}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Title"
                        />

                        <input
                            type="text"
                            name="posterUrl"
                            defaultValue={event.posterUrl}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Poster URL"
                        />

                        <textarea
                            name="desc"
                            defaultValue={event.desc}
                            rows={6}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Event Description"
                        />

                        <input
                            type="text"
                            name="theme"
                            defaultValue={event.theme}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Theme"
                        />

                        <input
                            type="text"
                            name="chiefGuests"
                            defaultValue={event.chiefGuests?.join(", ")}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Chief Guests (comma separated)"
                        />

                        <input
                            type="number"
                            name="registrationLimit"
                            defaultValue={event.registrationLimit}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Registration Limit"
                        />

                        <input
                            type="text"
                            name="registrationFee"
                            defaultValue={event.registrationFee}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Registration Fee"
                        />

                        <input
                            type="url"
                            name="registrationLink"
                            defaultValue={event.registrationLink}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Registration Link"
                        />

                        <input
                            type="date"
                            name="registrationOpeningDate"
                            defaultValue={event.registrationOpeningDate?.slice(0, 10)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />

                        <input
                            type="date"
                            name="registrationClosingDate"
                            defaultValue={event.registrationClosingDate?.slice(0, 10)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />

                        <input
                            type="date"
                            name="eventDate"
                            defaultValue={event.eventDate?.slice(0, 10)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />

                        <input
                            type="time"
                            name="eventTime"
                            defaultValue={event.eventTime}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />

                        <input
                            type="text"
                            name="eventVenueAddress"
                            defaultValue={event.eventVenueAddress}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Venue Address"
                        />

                        <input
                            type="text"
                            name="status"
                            defaultValue={event.status}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Status (upcoming, ongoing, closed)"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    // 📄 View Mode
                    <>
                        <h2 className="text-xl font-bold text-gray-900">{event.title || "Untitled Event"}</h2>

                        {event.posterUrl && (
                            <div>
                                <strong>Poster:</strong>
                                <img src={event.posterUrl} alt="Event Poster" className="w-full max-w-md mt-2 rounded" />
                            </div>
                        )}

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

                        <p className="text-gray-700">
                            <strong>Theme:</strong> {event.theme || "No theme specified"}
                        </p>

                        {event.chiefGuests?.length > 0 && (
                            <p className="text-gray-700">
                                <strong>Chief Guests:</strong> {event.chiefGuests.join(", ")}
                            </p>
                        )}

                        <p className="text-gray-700">
                            <strong>Registration Limit:</strong> {event.registrationLimit || "No limit"}
                        </p>

                        <p className="text-gray-700">
                            <strong>Registration Fee:</strong>{" "}
                            {event.registrationFee === 0 ? "Free" : `₹${event.registrationFee}`}
                        </p>

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

                        <p className="text-gray-700">
                            <strong>Venue:</strong> {event.eventVenueAddress || "Venue not specified"}
                        </p>

                        <p className="text-gray-700">
                            <strong>Status:</strong>{" "}
                            <span className="capitalize">{event.status || "draft"}</span>
                        </p>

                        <div className="prose" dangerouslySetInnerHTML={{ __html: event.desc }} />
                    </>
                )}
            </div>
        </div>
    );
}