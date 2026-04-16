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

    const event = await Events.findById(id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Update all flat fields
    const flatFields = [
      'title', 'desc', 'theme', 'posterUrl', 'registrationLimit',
      'registrationFee', 'eventDate', 'eventTime', 'eventVenueAddress',
      'status', 'chiefGuests', 'imagesArray',
    ];

    flatFields.forEach((field) => {
      if (body[field] !== undefined) {
        event[field] = body[field];
      }
    });

    // Handle nested isRegistrationOpen separately
    if (body.isRegistrationOpen !== undefined) {
      if (typeof body.isRegistrationOpen === 'object' && body.isRegistrationOpen !== null) {
        event.isRegistrationOpen = {
          performer: body.isRegistrationOpen.performer ?? event.isRegistrationOpen?.performer ?? false,
          audience: body.isRegistrationOpen.audience ?? event.isRegistrationOpen?.audience ?? false,
        };
      }
    }

    await event.save();
    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.error('Event update error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}