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
    // 1. Validate event
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isRegistrationOpen) {
      return NextResponse.json({ error: 'Registration is closed or not started' }, { status: 400 });
    }

    // 2. Extract fields
    const fields = {
      name: data.get('name')?.trim(),
      email: data.get('email')?.trim(),
      phone: data.get('phone')?.trim(),
      category: data.get('category')?.trim(),
      age: data.get('age')?.trim(),
      address: data.get('address')?.trim(),
      socialLink: data.get('socialLink')?.trim(),
      howKnowAboutMic: data.get('howKnowAboutMic')?.trim(),
      anyQues: data.get('anyQues')?.trim() || '',
    };

    const contentFile = data.get('contentFile');

    // 3. Required fields check
    // Validate each field individually
    if (!fields.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!fields.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!fields.phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }
    if (!fields.category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!fields.age) {
      return NextResponse.json({ error: 'Age is required' }, { status: 400 });
    }
    if (!fields.address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }
    if (!fields.howKnowAboutMic) {
      return NextResponse.json({ error: 'How you know about Mic is required' }, { status: 400 });
    }
    // Content file check only if category is NOT Audience
    if (fields.category !== 'Audience' && !contentFile) {
      return NextResponse.json({ error: 'Content file is required' }, { status: 400 });
    }

    let uploadResult = null;

    // Only validate & upload file if category is NOT "Audience" and a file is provided
    if (fields.category !== 'Audience' && contentFile) {
      // 4. File size validation (≤ 25MB)
      if (contentFile.size > 25 * 1024 * 1024) {
        return NextResponse.json({ error: 'Content file exceeds 25MB limit' }, { status: 400 });
      }

      // 5. Upload to Cloudinary
      const buffer = Buffer.from(await contentFile.arrayBuffer());

      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'micofmithila/registerationContents', resource_type: 'auto' },
            (err, result) => (err ? reject(err) : resolve(result))
          );
          stream.end(buffer);
        });

      uploadResult = await uploadToCloudinary();
    }


    // 6. Save registration
    const registration = await EventRegistrations.create({
      eventId: event._id,
      date: new Date(),
      ...fields,
      contentLink: uploadResult ? uploadResult.secure_url : null
    });

    // 7. Success response
    return NextResponse.json({
      message: 'Registration successful',
      registrationId: registration._id,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
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

  const { id: eventId } = await params;
  const body = await req.json();

  const { registrationId, isApproved } = body;

  if (!registrationId || typeof isApproved !== 'boolean') {
    return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
  }

  try {
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