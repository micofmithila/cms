import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import HomepageSettings from '@/lib/models/HomepageSettings';

// 👇 Explicitly import all referenced models so Mongoose registers them
import '@/lib/models/Events';
import '@/lib/models/Gallery';

export async function GET() {
  await dbConnect();
  try {
    let settings = await HomepageSettings.findOne()
      .populate('featuredEventId')
      .populate('featuredImages');

    if (!settings) {
      settings = await HomepageSettings.create({});
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error('Homepage GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    let settings = await HomepageSettings.findOne();

    if (!settings) {
      settings = await HomepageSettings.create(body);
    } else {
      Object.keys(body).forEach((key) => {
        settings[key] = body[key];
      });
      settings.updatedAt = new Date();
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error('Homepage PUT error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}