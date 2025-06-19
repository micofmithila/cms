import mongoose from 'mongoose';

const EventRegistrationsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Events', required: true },
  isSelected: { type: Boolean, default: false },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: String, required: true },
  socialLink: { type: String, required: true },
  otherQues: { type: String, required: true },
  contentLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.EventRegistrations || mongoose.model('EventRegistrations', EventRegistrationsSchema);