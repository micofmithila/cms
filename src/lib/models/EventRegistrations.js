import mongoose from 'mongoose';

const EventRegistrationsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Events', required: true },
  isApproved: { type: Boolean, default: false },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: String, required: true },
  address: { type: String, required: true },
  socialLink: { type: String, default: null },
  howKnowAboutMic: { type: String },
  anyQues: { type: String },
  contentLink: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.EventRegistrations || mongoose.model('EventRegistrations', EventRegistrationsSchema);