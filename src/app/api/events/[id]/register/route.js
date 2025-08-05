import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Events from '@/lib/models/Events';
import EventRegistrations from '@/lib/models/EventRegistrations';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST: Register for event
export async function POST(req, { params }) {
  await dbConnect();

  const { id: eventId } = await params;
  const data = await req.formData();

  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isRegistrationOpen) {
      return NextResponse.json({ error: 'Registration is closed or not started' }, { status: 400 });
    }

    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const phone = data.get('phone')?.trim();
    const category = data.get('category')?.trim();
    const age = data.get('age')?.trim();
    const address = data.get('address')?.trim();
    const socialLink = data.get('socialLink')?.trim();
    const howKnowAboutMic = data.get('howKnowAboutMic')?.trim();
    const anyQues = data.get('anyQues')?.trim();
    const contentFile = data.get('contentFile');

    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !age ||
      !address ||
      !socialLink ||
      !howKnowAboutMic ||
      !contentFile
    ) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    // Validate file size ≤ 25MB
    if (contentFile.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'Content file exceeds 25MB limit' }, { status: 400 });
    }

    const buffer = Buffer.from(await contentFile.arrayBuffer());

    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'micofmithila/registerationContents', resource_type: 'auto' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

    const result = await uploadToCloudinary();

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
      anyQues: anyQues || '',
      contentLink: result.secure_url
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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: eventId } = await params;

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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