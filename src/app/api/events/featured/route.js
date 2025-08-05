import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Events from '@/lib/models/Events';

export async function GET() {
  try {
    await dbConnect();

    const featuredEvent = await Events.findOne({ isFeatured: true }).sort({ createdAt: -1 });

    if (!featuredEvent) {
      return NextResponse.json({ error: 'No featured event found' }, { status: 404 });
    }

    return NextResponse.json(featuredEvent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch featured event', details: error.message },
      { status: 500 }
    );
  }
}