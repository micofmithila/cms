"use client";
import { useState } from "react";
import DescriptionEditor from "@/components/DescriptionEditor";
import { z } from "zod";
import { eventSchema } from "@/lib/validations";

export default function EventsPageAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    posterUrl: "",
    imagesArray: [""],
    chiefGuests: [""],
    registrationLimit: "",
    registrationFee: "",
    registrationLink: "",
    registrationOpeningDate: "",
    registrationClosingDate: "",
    eventDate: "",
    eventTime: "",
    eventVenueAddress: "",
    status: "draft"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDescChange = (content) => {
    setFormData(prev => ({ ...prev, desc: content }));

    // Clear error if present
    if (errors.desc) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.desc;
        return newErrors;
      });
    }
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      imagesArray: [...prev.imagesArray, ""]
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.imagesArray];
    updatedImages[index] = value;
    setFormData(prev => ({
      ...prev,
      imagesArray: updatedImages
    }));
  };

  const handleAddGuest = () => {
    setFormData(prev => ({
      ...prev,
      chiefGuests: [...prev.chiefGuests, ""]
    }));
  };

  const handleGuestChange = (index, value) => {
    const updatedGuests = [...formData.chiefGuests];
    updatedGuests[index] = value;
    setFormData(prev => ({
      ...prev,
      chiefGuests: updatedGuests
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", message: "" });
    setErrors({});

    // Filter out empty values from arrays
    const cleanFormData = {
      ...formData,
      imagesArray: formData.imagesArray.filter(img => img.trim() !== ""),
      chiefGuests: formData.chiefGuests.filter(guest => guest.trim() !== "")
    };

    try {
      // Validate with Zod
      eventSchema.parse(cleanFormData);

      // Send data to API
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      // Success
      setSubmitMessage({
        type: "success",
        message: "Event created successfully"
      });

      // Reset form (optional)
      setFormData({
        title: "",
        desc: "",
        posterUrl: "",
        imagesArray: [""],
        chiefGuests: [""],
        registrationLimit: "",
        registrationFee: "",
        registrationLink: "",
        registrationOpeningDate: "",
        registrationClosingDate: "",
        eventDate: "",
        eventTime: "",
        eventVenueAddress: "",
        status: "draft"
      });
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach(err => {
          // Extract field name from path
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        setSubmitMessage({
          type: "error",
          message: "Please fix the validation errors"
        });
      } else {
        // Handle API errors
        setSubmitMessage({
          type: "error",
          message: error.message || "Something went wrong"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create / Edit Event</h2>

      {submitMessage.message && (
        <div className={`p-4 mb-6 rounded-md ${submitMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
          {submitMessage.message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 ${errors.title ? "border-red-500" : ""}`}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Event Description</label>
          <div className={`border rounded-md overflow-hidden quill-editor ${errors.desc ? "border-red-500" : ""}`}>
            <DescriptionEditor value={formData.desc} onChange={handleDescChange} />
          </div>
          {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
        </div>

        {/* Poster URL */}
        <div>
          <label className="block font-medium mb-1">Poster URL</label>
          <input
            type="url"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 ${errors.posterUrl ? "border-red-500" : ""}`}
            required
          />
          {errors.posterUrl && <p className="text-red-500 text-sm mt-1">{errors.posterUrl}</p>}
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">Images</label>
          {formData.imagesArray.map((img, index) => (
            <div key={index} className="mb-2">
              <input
                type="url"
                className={`w-full border rounded-md px-3 py-2 ${errors[`imagesArray.${index}`] ? "border-red-500" : ""
                  }`}
                placeholder={`Image URL #${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {errors[`imagesArray.${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`imagesArray.${index}`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-blue-600 text-sm mt-1"
          >
            + Add another image
          </button>
        </div>

        {/* Chief Guests */}
        <div>
          <label className="block font-medium mb-1">Chief Guests</label>
          {formData.chiefGuests.map((guest, index) => (
            <input
              key={index}
              type="text"
              className="w-full border rounded-md px-3 py-2 mb-2"
              placeholder={`Guest Name #${index + 1}`}
              value={guest}
              onChange={(e) => handleGuestChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddGuest}
            className="text-blue-600 text-sm mt-1"
          >
            + Add another guest
          </button>
        </div>

        {/* Registration Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Registration Limit</label>
            <input
              type="number"
              name="registrationLimit"
              value={formData.registrationLimit}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.registrationLimit ? "border-red-500" : ""}`}
              required
            />
            {errors.registrationLimit && <p className="text-red-500 text-sm mt-1">{errors.registrationLimit}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Registration Fee (₹)</label>
            <input
              type="number"
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.registrationFee ? "border-red-500" : ""}`}
              required
            />
            {errors.registrationFee && <p className="text-red-500 text-sm mt-1">{errors.registrationFee}</p>}
          </div>
        </div>

        {/* Registration Link */}
        <div>
          <label className="block font-medium mb-1">Registration Link</label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 ${errors.registrationLink ? "border-red-500" : ""}`}
            required
          />
          {errors.registrationLink && <p className="text-red-500 text-sm mt-1">{errors.registrationLink}</p>}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Opening Date</label>
            <input
              type="date"
              name="registrationOpeningDate"
              value={formData.registrationOpeningDate}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.registrationOpeningDate ? "border-red-500" : ""}`}
              required
            />
            {errors.registrationOpeningDate && <p className="text-red-500 text-sm mt-1">{errors.registrationOpeningDate}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Closing Date</label>
            <input
              type="date"
              name="registrationClosingDate"
              value={formData.registrationClosingDate}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.registrationClosingDate ? "border-red-500" : ""}`}
              required
            />
            {errors.registrationClosingDate && <p className="text-red-500 text-sm mt-1">{errors.registrationClosingDate}</p>}
          </div>
        </div>

        {/* Event Date/Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.eventDate ? "border-red-500" : ""}`}
              required
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${errors.eventTime ? "border-red-500" : ""}`}
              required
            />
            {errors.eventTime && <p className="text-red-500 text-sm mt-1">{errors.eventTime}</p>}
          </div>
        </div>

        {/* Venue Address */}
        <div>
          <label className="block font-medium mb-1">Venue Address</label>
          <textarea
            name="eventVenueAddress"
            value={formData.eventVenueAddress}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 ${errors.eventVenueAddress ? "border-red-500" : ""}`}
            rows="2"
            required
          />
          {errors.eventVenueAddress && <p className="text-red-500 text-sm mt-1">{errors.eventVenueAddress}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Event Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Event"}
          </button>
        </div>
      </form>
    </div>
  );
}