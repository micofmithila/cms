"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditCrewPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
    imageUrl: "",
    social: {
      youtube: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch crew details on mount
  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const res = await fetch(`/api/crew/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch crew member");

        const crew = data.crew;
        setForm({
          name: crew.name || "",
          role: crew.role || "",
          description: crew.description || "",
          imageUrl: crew.imageUrl || "",
          social: crew.social || {
            youtube: "",
            instagram: "",
            twitter: "",
            linkedin: "",
          },
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCrew();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["youtube", "instagram", "twitter", "linkedin"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch(`/api/crew/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setSuccess("Crew member updated successfully ✅");
      router.push("/dashboard/crew"); // optional redirect
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading crew member...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Crew Member</h1>

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
          {["youtube", "instagram", "twitter", "linkedin"].map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {platform}
              </label>
              <input
                type="url"
                name={platform}
                value={form.social?.[platform] || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Crew Member"}
        </button>
      </form>
    </div>
  );
};

export default EditCrewPage;