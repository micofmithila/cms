import RegisterPage from './RegisterPage';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`, {
      cache: 'no-store',
    });
    const event = await res.json();

    return {
      title: `Register — ${event.title} | MIC of Mithila`,
      description: `Register for ${event.title} — an open mic event by MIC of Mithila in Madhubani, Bihar. Join as a performer or audience member.`,
      openGraph: {
        title: `Register — ${event.title} | MIC of Mithila`,
        description: `Secure your spot at ${event.title} by MIC of Mithila.`,
        images: event.posterUrl ? [{ url: event.posterUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'Register | MIC of Mithila',
      description: 'Register for an open mic event by MIC of Mithila.',
    };
  }
}

export default function RegisterPageWrapper() {
  return <RegisterPage />;
}