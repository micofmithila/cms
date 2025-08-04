"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DescriptionEditor from "@/components/Event/DescriptionEditor";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
    {...props}
  >
    {children}
  </button>
);

const EditEventPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [chiefGuests, setChiefGuests] = useState([""]);
  const [imagesArray, setImagesArray] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEventData(data);
        setChiefGuests(data.chiefGuests?.length ? data.chiefGuests : [""]);
        setImagesArray(data.imagesArray?.length ? data.imagesArray : [""]);
      } catch (err) {
        console.error("Failed to load event data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuestChange = (index, value) => {
    const newGuests = [...chiefGuests];
    newGuests[index] = value;
    setChiefGuests(newGuests);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imagesArray];
    newImages[index] = value;
    setImagesArray(newImages);
  };

  const addInput = (setter, state) => setter([...state, ""]);
  const removeInput = (setter, state, index) => {
    const updated = [...state];
    updated.splice(index, 1);
    setter(updated);
  };

  const updateEvent = async () => {
    const payload = {
      ...eventData,
      chiefGuests: chiefGuests.filter(Boolean),
      imagesArray: imagesArray.filter(Boolean),
    };

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/dashboard/events");
      } else {
        console.error(await res.text());
      }
    } catch (err) {
      console.error("Event update failed:", err);
    }
  };

  if (loading || !eventData) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Edit Event</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Title" name="title" value={eventData.title} onChange={handleEventChange} required />
        <Input label="Theme" name="theme" value={eventData.theme} onChange={handleEventChange} required />
        <Input label="Poster URL" name="posterUrl" value={eventData.posterUrl} onChange={handleEventChange} required />
        <Input label="Registration Limit" name="registrationLimit" type="number" value={eventData.registrationLimit} onChange={handleEventChange} required />
        <Input label="Registration Fee" name="registrationFee" type="number" value={eventData.registrationFee} onChange={handleEventChange} required />
        <Input label="Event Date" name="eventDate" type="date" value={eventData.eventDate?.slice(0, 10)} onChange={handleEventChange} required />
        <Input label="Event Time" name="eventTime" type="time" value={eventData.eventTime} onChange={handleEventChange} required />
        <Input label="Venue Address" name="eventVenueAddress" value={eventData.eventVenueAddress} onChange={handleEventChange} required />

        {/* Registration Open Checkbox */}
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            name="isRegistrationOpen"
            checked={eventData.isRegistrationOpen}
            onChange={handleEventChange}
            className="w-5 h-5"
          />
          <label className="text-sm font-medium">Is Registration Open?</label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Status</label>
          <select
            name="status"
            value={eventData.status}
            onChange={handleEventChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Chief Guests */}
      <div>
        <label className="text-sm font-medium mb-2 block">Chief Guests</label>
        {chiefGuests.map((val, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={val}
              onChange={(e) => handleGuestChange(i, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder={`Chief Guest ${i + 1}`}
            />
            {i === chiefGuests.length - 1 && (
              <button type="button" onClick={() => addInput(setChiefGuests, chiefGuests)} className="text-blue-600 text-sm">+ Add</button>
            )}
            {chiefGuests.length > 1 && (
              <button type="button" onClick={() => removeInput(setChiefGuests, chiefGuests, i)} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Images */}
      <div>
        <label className="text-sm font-medium mb-2 block">Images</label>
        {imagesArray.map((val, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={val}
              onChange={(e) => handleImageChange(i, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder={`Image URL ${i + 1}`}
            />
            {i === imagesArray.length - 1 && (
              <button type="button" onClick={() => addInput(setImagesArray, imagesArray)} className="text-blue-600 text-sm">+ Add</button>
            )}
            {imagesArray.length > 1 && (
              <button type="button" onClick={() => removeInput(setImagesArray, imagesArray, i)} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <DescriptionEditor
          value={eventData.desc}
          onChange={(value) =>
            setEventData((prev) => ({ ...prev, desc: value }))
          }
        />
      </div>

      <div className="pt-6">
        <Button type="button" onClick={updateEvent}>Update Event</Button>
      </div>
    </div>
  );
};

export default EditEventPage;