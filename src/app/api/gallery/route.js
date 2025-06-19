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

// title: { type: String, required: true },
// description: { type: String, required: true },
// tags: [{ type: String, required: true }],
// relatedEvent: { type: String, required: true },
// uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// category: { type: String, required: true },
// featured: { type: Boolean, default: false },
// imageUrls: [{ type: String, required: true }],

export async function GET() {
    await dbConnect();
    try {
        const galleryItems = await Gallery.find().sort({ createdAt: -1 }); // Fetch all galleryItems sorted by latest

        if (!galleryItems.length) {
            return NextResponse.json({ error: "No galleryItems found" }, { status: 404 });
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

        const title = form.get('title');
        const description = form.get('description');
        const tags = JSON.parse(form.get('tags'));
        const relatedEvent = form.get('relatedEvent');
        const category = form.get('category');
        const featured = form.get('featured') === 'true';

        const uploadedUrls = [];

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

                uploadedUrls.push(url);
            }
        }

        const newGalleryItem = new Gallery({
            title,
            description,
            tags,
            relatedEvent,
            category,
            featured,
            imageUrls: uploadedUrls,
            uploadedBy: session.user.id,
        });

        await newGalleryItem.save();

        return NextResponse.json(newGalleryItem, { status: 201 });
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
        const galleryItem = await Gallery.findByIdAndDelete(id);

        if (!galleryItem) {
            return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Gallery item deleted successfully" }, { status: 200 });
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
        const { id, title, description, imageUrls, tags, category, featured } = await req.json();
        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        }

        if (title) galleryItem.title = title;
        if (description) galleryItem.description = description;
        if (imageUrls) galleryItem.imageUrls = imageUrls;
        if (tags) galleryItem.tags = tags;
        if (category) galleryItem.category = category;
        if (featured !== undefined) galleryItem.featured = featured; // Check for undefined to allow false value

        await galleryItem.save();
        return NextResponse.json(galleryItem, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}