import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '../auth/[...nextauth]/route';
import Events from '@/lib/models/Events';

    // title: { type: String, required: true },
    // desc: { type: String, required: true },
    // posterUrl: { type: String, required: true },
    // imagesArray: [{ type: String }],
    // chiefGuests: [{ type: String }],
    // registrationLimit: { type: Number, required: true },
    // registrationFee: { type: Number, required: true },
    // registrationLink: { type: String, required: true },
    // registrationOpeningDate: { type: Date, required: true },
    // registrationClosingDate: { type: Date, required: true },
    // eventDate: { type: Date, required: true },
    // eventTime: { type: String, required: true },
    // eventVenueAddress: { type: String, required: true },
    // status: { type: String, enum: ['draft','upcoming', 'completed', 'cancelled'], default: 'draft' },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    export async function GET(request) {
        await dbConnect();
      
        try {
          // `request.url` is an absolute URL (e.g. https://yourdomain.com/api/events?id=...)
          const { searchParams } = new URL(request.url);
          const id = searchParams.get("id");
      
          if (id) {
            const event = await Events.findById(id);
            if (!event) {
              return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }
            return NextResponse.json(event, { status: 200 });
          } else {
            const events = await Events.find().sort({ createdAt: -1 });
            if (!events.length) {
              return NextResponse.json({ error: "No events found" }, { status: 404 });
            }
            return NextResponse.json(events, { status: 200 });
          }
        } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
      

    export async function POST(req) {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const { title, desc, posterUrl, imagesArray, chiefGuests, registrationLimit, registrationFee, registrationLink, registrationOpeningDate, registrationClosingDate, eventDate, eventTime, eventVenueAddress, status } = await req.json();
            const newEvent = new Events({
                title,
                desc,
                posterUrl,
                imagesArray,
                chiefGuests,
                registrationLimit,
                registrationFee,
                registrationLink,
                registrationOpeningDate,
                registrationClosingDate,
                eventDate,
                eventTime,
                eventVenueAddress,
                status,
                createdBy: session.user.id // Assuming session.user.id contains the ID of the logged-in user
            });

            await newEvent.save();
            return NextResponse.json(newEvent, { status: 201 });
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
            const event = await Events.findByIdAndDelete(id);

            if (!event) {
                return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
    export async function PUT(req) {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const { id, title, desc, posterUrl, imagesArray, chiefGuests, registrationLimit, registrationFee, registrationLink, registrationOpeningDate, registrationClosingDate, eventDate, eventTime, eventVenueAddress, status } = await req.json();
            const updatedEvent = await Events.findByIdAndUpdate(id, {
                title,
                desc,
                posterUrl,
                imagesArray,
                chiefGuests,
                registrationLimit,
                registrationFee,
                registrationLink,
                registrationOpeningDate,
                registrationClosingDate,
                eventDate,
                eventTime,
                eventVenueAddress,
                status
            }, { new: true });

            if (!updatedEvent) {
                return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }

            return NextResponse.json(updatedEvent, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }