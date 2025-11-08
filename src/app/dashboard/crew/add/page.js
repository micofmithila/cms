"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddCrewPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        role: "",
        description: "",
        imageUrl: "",
        social: {
            instagram: "",
            youtube: "",
            twitter: "",
            linkedin: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["instagram", "youtube", "twitter", "linkedin"].includes(name)) {
            setForm((prev) => ({
                ...prev,
                social: { ...prev.social, [name]: value }
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch("/api/crew", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setSuccess("Crew member added successfully ✅");
            setForm({
                name: "",
                role: "",
                description: "",
                imageUrl: "",
                social: {
                    instagram: "",
                    youtube: "",
                    twitter: "",
                    linkedin: ""
                }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add Crew Member</h1>

            {error && <p className="mb-4 text-red-500">{error}</p>}
            {success && <p className="mb-4 text-green-600">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium mb-1">Role *</label>
                    <input
                        type="text"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description *</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Instagram</label>
                        <input
                            type="url"
                            name="instagram"
                            value={form.social.instagram}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Youtube</label>
                        <input
                            type="url"
                            name="instagram"
                            value={form.social.youtube}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Twitter</label>
                        <input
                            type="url"
                            name="twitter"
                            value={form.social.twitter}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">LinkedIn</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={form.social.linkedin}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Crew Member"}
                </button>
            </form>
        </div>
    );
};

export default AddCrewPage;