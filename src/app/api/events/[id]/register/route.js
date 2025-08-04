import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Events from '@/lib/models/Events';
import EventRegistrations from '@/lib/models/EventRegistrations';

// POST: Register for event
export async function POST(req, { params }) {
  await dbConnect();

  const { id: eventId } = params;
  const body = await req.json();

  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isRegistrationOpen) {
      return NextResponse.json({ error: 'Registration is closed or not started' }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      category,
      age,
      address,
      socialLink,
      howKnowAboutMic,
      anyQues
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !age ||
      !address ||
      !socialLink ||
      !howKnowAboutMic
    ) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const registration = await EventRegistrations.create({
      eventId: event._id,
      date: new Date(),
      name,
      email,
      phone,
      category,
      age,
      address,
      socialLink,
      howKnowAboutMic,
      anyQues: anyQues || ''
    });

    return NextResponse.json({
      message: 'Registration successful',
      registrationId: registration._id
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: Get all registrations for an event (admin only)
export async function GET(req, { params }) {
  await dbConnect();

  const { id: eventId } = params;

  try {
    // Add admin authentication check here if needed
    const registrations = await EventRegistrations.find({ eventId });
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Toggle isApproved for a registration (admin only)
export async function PUT(req, { params }) {
  await dbConnect();

  const { id: eventId } = params;
  const body = await req.json();

  const { registrationId, isApproved } = body;

  if (!registrationId || typeof isApproved !== 'boolean') {
    return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
  }

  try {
    // Add admin authentication check here if needed
    const updated = await EventRegistrations.findOneAndUpdate(
      { _id: registrationId, eventId },
      { isApproved },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Registration ${isApproved ? 'approved' : 'declined'} successfully`,
      registration: updated
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}