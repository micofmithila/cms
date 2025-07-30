import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  tags: [{ type: String, required: true }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);