import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/route";
import Crew from "@/lib/models/Crew";

// GET /api/crew/[id] → Fetch one crew member
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Crew ID required" }, { status: 400 });
    }

    const crew = await Crew.findById(id).lean();
    if (!crew) {
      return NextResponse.json({ error: "Crew member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, crew });
  } catch (err) {
    console.error("Error fetching crew member:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// PUT /api/crew/[id] → Update one crew member
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Crew ID required" }, { status: 400 });
    }

    const updated = await Crew.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Crew member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Error updating crew member:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// DELETE /api/crew/[id] → Delete one crew member
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Crew ID required" }, { status: 400 });
    }

    const deleted = await Crew.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Crew member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Crew member deleted" });
  } catch (err) {
    console.error("Error deleting crew member:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}