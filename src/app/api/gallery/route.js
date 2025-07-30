import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '../auth/[...nextauth]/route';
import Gallery from '@/lib/models/Gallery';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    try {
        const query = session ? {} : { isPrivate: false };
        const galleryItems = await Gallery.find(query).sort({ createdAt: -1 });

        if (!galleryItems.length) {
            return NextResponse.json({ error: "No gallery items found" }, { status: 404 });
        }
        return NextResponse.json(galleryItems, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const form = await req.formData();
        const files = form.getAll('images');
        const tags = JSON.parse(form.get('tags'));
        const isPrivate = form.get('isPrivate') === 'true';

        const uploadedItems = [];

        for (const file of files) {
            if (file && typeof file === 'object') {
                const buffer = Buffer.from(await file.arrayBuffer());

                const url = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'micofmithila/gallery',
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result.secure_url);
                        }
                    );
                    stream.end(buffer);
                });

                const newItem = new Gallery({
                    imageUrl: url,
                    tags,
                    isPrivate,
                    uploadedBy: session.user.id,
                });

                await newItem.save();
                uploadedItems.push(newItem);
            }
        }

        return NextResponse.json(uploadedItems, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await req.json();
        const item = await Gallery.findByIdAndDelete(id);

        if (!item) {
            return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, imageUrl, tags, isPrivate } = await req.json();
        const item = await Gallery.findById(id);

        if (!item) {
            return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        }

        if (imageUrl) item.imageUrl = imageUrl;
        if (tags) item.tags = tags;
        if (typeof isPrivate === 'boolean') item.isPrivate = isPrivate;

        await item.save();
        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
