import mongoose from 'mongoose';

const EventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    theme: { type: String, required: true },
    posterUrl: { type: String, required: true },
    imagesArray: [{ type: String }],
    chiefGuests: [{ type: String }],
    registrationLimit: { type: Number, required: true },
    registrationFee: { type: Number, required: true },
    registrationLink: { type: String, required: true },
    registrationOpeningDate: { type: Date, required: true },
    registrationClosingDate: { type: Date, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    eventVenueAddress: { type: String, required: true },
    status: { type: String, enum: ['draft','upcoming', 'completed', 'cancelled'], default: 'draft' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Events || mongoose.model('Events', EventsSchema);