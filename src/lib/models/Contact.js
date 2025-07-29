import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: String,
  contact: String,
  subject: String,
  message: String,
  read: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);