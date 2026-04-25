// /api/events/[id]/route.js or route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Events from '@/lib/models/Events';

// GET: View Event by ID
export async function GET(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const { id: eventId } = await params;
  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // If event is draft, allow only admin to view
    if (event.status === 'draft') {
      if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Update Event by Admin
export async function PUT(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();

    const updateData = {
      title: body.title,
      desc: body.desc,
      theme: body.theme,
      posterUrl: body.posterUrl,
      registrationLimit: body.registrationLimit,
      registrationFee: body.registrationFee,
      eventDate: body.eventDate || null,
      eventTime: body.eventTime || '',
      eventVenueAddress: body.eventVenueAddress,
      status: body.status,
      chiefGuests: Array.isArray(body.chiefGuests) ? body.chiefGuests : [],
      imagesArray: Array.isArray(body.imagesArray) ? body.imagesArray : [],
      performerCategories: Array.isArray(body.performerCategories) ? body.performerCategories : [],
      'isRegistrationOpen.performer': body.isRegistrationOpen?.performer ?? false,
      'isRegistrationOpen.audience': body.isRegistrationOpen?.audience ?? false,
    };

    const updated = await Events.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: false }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error('Event update error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}