"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCopy, FaDownload, FaEdit, FaTrash, FaEyeSlash, FaEye } from "react-icons/fa";

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
        const filtered = images.filter((img) =>
            img.tags?.some((tag) => tag.toLowerCase().includes(value))
        );
        setFilteredImages(filtered);
    };

    const copyLink = (url) => {
        navigator.clipboard.writeText(url);
        alert("Image link copied to clipboard!");
    };

    // const downloadImage = (url) => {
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "micofmithila-image.jpg";
    //     link.click();
    // };

    const downloadImage = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const now = new Date();
            const pad = (num) => num.toString().padStart(2, '0');

            const year = now.getFullYear();
            const month = pad(now.getMonth() + 1);
            const day = pad(now.getDate());
            const hours = pad(now.getHours());
            const minutes = pad(now.getMinutes());
            const seconds = pad(now.getSeconds());

            const formatted = `MOM_${year}${month}${day}_${hours}${minutes}${seconds}.jpg`;

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = formatted;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed.');
        }
    };


    const confirmDelete = (id) => {
        if (confirm("Are you sure you want to delete this image?")) {
            alert("Delete functionality not yet implemented.");
        }
    };

    const togglePrivacy = async (id, currentStatus) => {
        try {
            await fetch(`/api/gallery/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPrivate: !currentStatus }),
            });
            fetchImages();
        } catch (error) {
            console.error("Error toggling privacy:", error);
        }
    };

    return (
        <div className="my-8 px-4 md:px-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold">Gallery Admin Panel</h1>
                <Link
                    href="/dashboard/gallery/add"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
                >
                    + Upload Image(s)
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search by tag..."
                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                value={searchTerm}
                onChange={handleSearch}
            />

            {filteredImages.length === 0 ? (
                <p className="text-gray-500 text-center">No images found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-md border">
                            <div className="relative">
                                <img
                                    src={item.imageUrl}
                                    alt="Gallery"
                                    className="w-full h-48 object-cover rounded-md mb-3"
                                />
                                {item.isPrivate && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                        Private
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-500 mb-1">
                                Tags: <span className="text-gray-700">{item.tags.join(", ")}</span>
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <button
                                    onClick={() => downloadImage(item.imageUrl)}
                                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                >
                                    <FaDownload className="text-xs" /> Download
                                </button>
                                <button
                                    onClick={() => copyLink(item.imageUrl)}
                                    className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
                                >
                                    <FaCopy className="text-xs" /> Copy
                                </button>
                                <button
                                    onClick={() => togglePrivacy(item._id, item.isPrivate)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs text-white ${item.isPrivate ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
                                >
                                    {item.isPrivate ? <FaEye /> : <FaEyeSlash />} {item.isPrivate ? "Make Public" : "Make Private"}
                                </button>
                            </div>

                            <div className="flex gap-2 mt-4 justify-end">
                                <Link
                                    href={`/dashboard/gallery/edit/${item._id}`}
                                    className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                                >
                                    <FaEdit className="text-sm" /> Edit
                                </Link>
                                <button
                                    onClick={() => confirmDelete(item._id)}
                                    className="flex items-center gap-1 text-red-600 text-sm hover:underline"
                                >
                                    <FaTrash className="text-sm" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
