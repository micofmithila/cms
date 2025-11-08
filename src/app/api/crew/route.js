import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '../auth/[...nextauth]/route';
import Crew from '@/lib/models/Crew';

export async function GET() {
    try {
        await dbConnect();

        const crew = await Crew.find()
            .sort({ createdAt: 1 })
            .lean();

        return NextResponse.json({ success: true, crew });
    } catch (err) {
        console.error("Error fetching crew:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, role, description, imageUrl, social } = body;

        // Validate required fields
        if (!name || !role || !description) {
            return NextResponse.json(
                { error: "Name, role and description are required" },
                { status: 400 }
            );
        }

        const newCrew = new Crew({
            name,
            role,
            description,
            imageUrl: imageUrl || null,
            social: social || {},
        });

        const saved = await newCrew.save();

        return NextResponse.json(
            { message: "New Crew member added!", data: saved },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error adding crew member:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, ...updates } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Crew ID required" }, { status: 400 });
        }

        const updated = await Crew.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Crew member not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, updated });
    } catch (err) {
        console.error("Error updating crew:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}