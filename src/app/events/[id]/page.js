import EventDetails from './EventDetails';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`, {
      cache: 'no-store',
    });
    const event = await res.json();

    return {
      title: `${event.title} | MIC of Mithila`,
      description: event.desc
        ? event.desc.replace(/<[^>]*>/g, '').slice(0, 155)
        : `Join us for ${event.title} — an open mic event by MIC of Mithila in Madhubani, Bihar.`,
      openGraph: {
        title: `${event.title} | MIC of Mithila`,
        description: event.desc
          ? event.desc.replace(/<[^>]*>/g, '').slice(0, 155)
          : `Join us for ${event.title}`,
        images: event.posterUrl ? [{ url: event.posterUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'Event | MIC of Mithila',
      description: 'Explore events by MIC of Mithila.',
    };
  }
}

export default function EventPage() {
  return <EventDetails />;
}