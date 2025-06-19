"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function GalleryPageAddAdmin() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: [],
        tagInput: "",
        category: "",
        featured: false,
        imageUrls: [],       // for preview only
        imageFiles: [],      // actual file objects
    });


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTagAdd = (e) => {
        e.preventDefault();
        if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput)) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, prev.tagInput],
                tagInput: "",
            }));
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...urls],
          imageFiles: [...prev.imageFiles, ...files],
        }));
      };
      

      const handleImageRemove = (urlToRemove) => {
        const index = formData.imageUrls.indexOf(urlToRemove);
        setFormData((prev) => {
          const newUrls = [...prev.imageUrls];
          const newFiles = [...prev.imageFiles];
          newUrls.splice(index, 1);
          newFiles.splice(index, 1);
          return {
            ...prev,
            imageUrls: newUrls,
            imageFiles: newFiles,
          };
        });
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!formData.title || !formData.description || !formData.category || formData.imageFiles.length === 0) {
          alert("Please fill all required fields and upload at least one image.");
          return;
        }
      
        const fd = new FormData();
        formData.imageFiles.forEach((file) => {
          fd.append("images", file); // field name must match backend: images
        });
        fd.append("title", formData.title);
        fd.append("description", formData.description);
        fd.append("category", formData.category);
        fd.append("featured", formData.featured.toString());
        fd.append("tags", JSON.stringify(formData.tags));
      
        try {
          const res = await fetch("/api/gallery", {
            method: "POST",
            body: fd,
          });
      
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Upload failed.");
          }
      
          const data = await res.json();
          alert("Gallery uploaded successfully!");
          console.log("Server response:", data);
      
          // Reset form
          setFormData({
            title: "",
            description: "",
            tags: [],
            tagInput: "",
            category: "",
            featured: false,
            imageUrls: [],
            imageFiles: [],
          });
        } catch (err) {
          console.error("Upload error:", err.message);
          alert("Upload failed: " + err.message);
        }
      };
      

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Gallery Admin Panel</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                {/* Title */}
                <div>
                    <label className="block font-medium">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description <span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-medium">Tags</label>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="text"
                            name="tagInput"
                            value={formData.tagInput}
                            onChange={handleInputChange}
                            className="flex-grow p-2 border rounded"
                            placeholder="Type and press Enter"
                            onKeyDown={(e) => e.key === "Enter" && handleTagAdd(e)}
                        />
                        <button
                            onClick={handleTagAdd}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {tag}
                                <button onClick={() => handleTagRemove(tag)} className="text-red-500">&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                    />
                    <label>Mark as Featured</label>
                </div>

                {/* Image Uploader */}
                <div>
                    <label className="block font-medium mb-1">Upload Images <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block"
                    />
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.imageUrls.map((url) => (
                            <div key={uuidv4()} className="relative group">
                                <img src={url} alt="preview" className="rounded shadow object-cover h-32 w-full" />
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(url)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                    Submit Gallery
                </button>
            </form>
        </div>
    );
}
