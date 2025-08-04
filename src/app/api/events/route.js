import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '../auth/[...nextauth]/route';
import Events from '@/lib/models/Events';

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    let query = {};

    // Only show drafts to admins
    if (!session || session.user.role !== 'admin') {
      query.status = { $ne: 'draft' };
    }

    const events = await Events.find(query).sort({ createdAt: -1 });

    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const newEvent = await Events.create({
      ...body,
      createdBy: session.user.id,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}