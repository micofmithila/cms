import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/lib/models/Contact';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, contact, subject, message } = body;

    if (!name || !contact || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const saved = await Contact.create({ success: true, name, contact, subject, message });

    return NextResponse.json({ message: 'Form submitted successfully', data: saved }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, read } = await req.json();

  const updated = await Contact.findByIdAndUpdate(id, { read }, { new: true });
  return NextResponse.json({ success: true, updated });
}