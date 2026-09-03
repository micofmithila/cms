import mongoose from 'mongoose';

const HomepageSettingsSchema = new mongoose.Schema({
  featuredEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    default: null,
  },
  featuredImages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    default: [],
  }],
  featuredVideos: [{
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    category: { type: String, default: '' },
  }],
  topPerformers: [{
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    socials: {
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
  }],
  heroImages: [{ type: String }],
  reviews: [{
    name: { type: String, required: true },
    role: { type: String, default: '' },
    review: { type: String, required: true },
  }],
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

delete mongoose.models.HomepageSettings;
export default mongoose.model('HomepageSettings', HomepageSettingsSchema);