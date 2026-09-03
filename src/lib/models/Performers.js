import mongoose from 'mongoose';

const PerformersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: String, required: true },
  bio: { type: String, required: true },
  socialLink: { type: String, required: true },
  contentLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  instagramLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Performers || mongoose.model('Performers', PerformersSchema);