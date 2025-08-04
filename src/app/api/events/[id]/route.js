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

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id: updatedEventId } = await params;
    const updatedEvent = await Events.findByIdAndUpdate(updatedEventId, body, {
      new: true,
      runValidators: true
    });

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}