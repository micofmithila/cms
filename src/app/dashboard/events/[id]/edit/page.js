"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DescriptionEditor from "@/components/Event/DescriptionEditor";
import toast from "react-hot-toast";

const DEFAULT_CATEGORIES = [
  'Poetry', 'Storytelling', 'Singing', 'Rapsong',
  'Beatboxing', 'Mimicry', 'Stand-up Comedy',
];

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
  const [performerCategories, setPerformerCategories] = useState([]);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEventData(data);
        setChiefGuests(data.chiefGuests?.length ? data.chiefGuests : [""]);
        setImagesArray(data.imagesArray?.length ? data.imagesArray : [""]);
        setPerformerCategories(data.performerCategories || []);
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

    if (name === 'isRegistrationOpen.performer' || name === 'isRegistrationOpen.audience') {
      const key = name.split('.')[1];
      setEventData((prev) => ({
        ...prev,
        isRegistrationOpen: {
          ...prev.isRegistrationOpen,
          [key]: checked,
        },
      }));
      return;
    }

    setEventData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

  const handleCategoryToggle = (cat) => {
    setPerformerCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;
    if (performerCategories.includes(trimmed)) {
      toast.error('Category already added.');
      return;
    }
    setPerformerCategories((prev) => [...prev, trimmed]);
    setCustomCategoryInput('');
  };

  const handleRemoveCategory = (cat) => {
    setPerformerCategories((prev) => prev.filter((c) => c !== cat));
  };

  const updateEvent = async () => {
    if (performerCategories.length === 0) {
      toast.error('Please select at least one performer category.');
      return;
    }
    const payload = {
      ...eventData,
      chiefGuests: chiefGuests.filter(Boolean),
      imagesArray: imagesArray.filter(Boolean),
      performerCategories,
    };

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Event updated successfully!');
        router.push("/dashboard/events");
      } else {
        const err = await res.json();
        toast.error(err.error || 'Update failed.');
      }
    } catch (err) {
      console.error("Event update failed:", err);
      toast.error('Something went wrong.');
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
        <Input label="Event Date" name="eventDate" type="date" value={eventData.eventDate?.slice(0, 10)} onChange={handleEventChange} />
        <Input label="Event Time" name="eventTime" type="time" value={eventData.eventTime} onChange={handleEventChange} />
        <Input label="Venue Address" name="eventVenueAddress" value={eventData.eventVenueAddress} onChange={handleEventChange} required />

        {/* Performer Registration Toggle */}
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
          <input
            type="checkbox"
            name="isRegistrationOpen.performer"
            checked={eventData.isRegistrationOpen?.performer || false}
            onChange={handleEventChange}
            className="w-5 h-5 accent-blue-600"
            id="regPerformer"
          />
          <label htmlFor="regPerformer" className="text-sm font-medium cursor-pointer">
            🎤 Open Performer Registration
          </label>
        </div>

        {/* Audience Registration Toggle */}
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
          <input
            type="checkbox"
            name="isRegistrationOpen.audience"
            checked={eventData.isRegistrationOpen?.audience || false}
            onChange={handleEventChange}
            className="w-5 h-5 accent-purple-600"
            id="regAudience"
          />
          <label htmlFor="regAudience" className="text-sm font-medium cursor-pointer">
            👥 Open Audience Registration
          </label>
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

      {/* Performer Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium block">
          Performer Categories
          <span className="text-gray-400 ml-1 text-xs">(select or add custom)</span>
        </label>

        {/* Default options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DEFAULT_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${performerCategories.includes(cat)
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <input
                type="checkbox"
                checked={performerCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="accent-blue-600 w-4 h-4 flex-shrink-0"
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Custom category input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customCategoryInput}
            onChange={(e) => setCustomCategoryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
            placeholder="Add custom category (e.g. Dance, Magic)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddCustomCategory}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            + Add
          </button>
        </div>

        {/* Selected tags */}
        {performerCategories.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400">
              {performerCategories.length} {performerCategories.length === 1 ? 'category' : 'categories'} selected
            </p>
            <div className="flex flex-wrap gap-2">
              {performerCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="text-blue-400 hover:text-red-500 transition ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
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
          onChange={(value) => setEventData((prev) => ({ ...prev, desc: value }))}
        />
      </div>

      <div className="pt-6">
        <Button type="button" onClick={updateEvent}>Update Event</Button>
      </div>
    </div>
  );
};

export default EditEventPage;