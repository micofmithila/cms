import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    relatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    imageUrls: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);