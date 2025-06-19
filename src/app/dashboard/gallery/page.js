"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GalleryPageAdmin() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setImages(data);
            setFilteredImages(data);
        } catch (err) {
            console.error("Error fetching gallery images:", err);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = images.filter((img) => {
            const titleMatch = img.title.toLowerCase().includes(value);
            const categoryMatch = img.category.toLowerCase().includes(value);
            const tagMatch = img.tags.some((tag) => tag.toLowerCase().includes(value));
            return titleMatch || categoryMatch || tagMatch;
        });
        setFilteredImages(filtered);
    };

    const copyLink = (url) => {
        navigator.clipboard.writeText(url);
        alert("Image link copied to clipboard!");
    };

    const downloadImage = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "micofmithila-image.jpg";
        link.click();
    };

    return (
        <div className="my-8">
            <h1 className="text-3xl font-bold mb-6">Gallery (Admin View)</h1>

            <input
                type="text"
                placeholder="Search by title, tags, or category..."
                className="w-full px-4 py-2 mb-6 border rounded shadow"
                value={searchTerm}
                onChange={handleSearch}
            />

            {/* Create Upload Image(s) */}
            <div className="flex justify-end mb-6">
                <Link
                    href="/dashboard/gallery/add"
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Upload Image(s)
                </Link>
            </div>

            {filteredImages.length === 0 ? (
                <p className="text-gray-500">No images found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((img) => (
                        <div key={img._id} className="bg-white p-4 rounded shadow">
                            {img.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={img.title}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                            ))}
                            <h3 className="font-semibold">{img.title}</h3>
                            <p className="text-sm text-gray-600">
                                Category: {img.category || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Tags: {img.tags.join(", ")}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {img.imageUrls.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <button
                                            onClick={() => downloadImage(url)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => copyLink(url)}
                                            className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-800"
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
