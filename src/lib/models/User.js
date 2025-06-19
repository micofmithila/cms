import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, select: false },
  bio: { type: String, default: '' },
  position: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);