import mongoose from "mongoose";

const CrewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: null },
    social: {
      instagram: { type: String, default: null },
      youtube: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Crew || mongoose.model("Crew", CrewSchema);