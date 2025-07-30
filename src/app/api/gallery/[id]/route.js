import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Gallery from '@/lib/models/Gallery';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PATCH(req, { params }) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    try {
        const body = await req.json();
        const image = await Gallery.findById(id);

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        if (typeof body.isPrivate === 'boolean') {
            image.isPrivate = body.isPrivate;
        }

        if (Array.isArray(body.tags)) {
            image.tags = body.tags;
        }

        await image.save();
        return NextResponse.json(image, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
