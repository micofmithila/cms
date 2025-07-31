import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await User.find().select('-password');
  return NextResponse.json(users);
}

export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, email, password, role, position, phone, bio } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      position: position || '',
      phone,
      bio,
    });

    await newUser.save();
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, email, role, position, phone, bio } = await req.json();
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (position) user.position = position;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    await user.save();
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    await user.deleteOne();
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
