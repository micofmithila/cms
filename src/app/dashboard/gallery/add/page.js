"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function GalleryPageAddAdmin() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 20);
    const updated = files.map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      tags: "",
      isPrivate: false,
    }));
    setImages((prev) => [...prev, ...updated].slice(0, 20));
  };

  const handleTagChange = (id, value) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, tags: value } : img))
    );
  };

  const handlePrivateToggle = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isPrivate: !img.isPrivate } : img
      )
    );
  };

  const handleImageRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Upload at least one image");

    for (const img of images) {
      const fd = new FormData();
      fd.append("images", img.file);
      fd.append("tags", JSON.stringify(img.tags.split(",").map((t) => t.trim())));
      fd.append("isPrivate", img.isPrivate.toString());

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const error = await res.json();
        console.error(error);
        alert(`Failed to upload ${img.file.name}`);
      }
    }

    alert("Images uploaded successfully");
    setImages([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Gallery Upload (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="font-medium block mb-2">Select up to 20 images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative border p-3 rounded shadow">
              <img
                src={img.preview}
                alt="preview"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <textarea
                value={img.tags}
                onChange={(e) => handleTagChange(img.id, e.target.value)}
                placeholder="Enter comma-separated tags (e.g. name, event)"
                className="w-full p-2 border rounded mb-2"
              ></textarea>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={img.isPrivate}
                    onChange={() => handlePrivateToggle(img.id)}
                  />
                  Mark as Private
                </label>
                <button
                  type="button"
                  onClick={() => handleImageRemove(img.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Upload All
          </button>
        )}
      </form>
    </div>
  );
}