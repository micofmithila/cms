'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ThankYouPage() {
    const router = useRouter();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        // Prevent double execution in React StrictMode
        if (hasRun.current) return;
        hasRun.current = true;

        const stored = sessionStorage.getItem('registrationData');
        console.log('Thank you page - stored data:', stored); // debug

        if (!stored) {
            setNotFound(true);
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            setData(parsed);
            sessionStorage.removeItem('registrationData');
        } catch (err) {
            console.error('Parse error:', err);
            setNotFound(true);
        }
    }, []);

    // Separate effect for redirect — only fires when notFound is confirmed
    useEffect(() => {
        if (!notFound) return;
        const timer = setTimeout(() => {
            router.replace(`/events/${id}`);
        }, 2000); // small delay so you can see if it hits this path
        return () => clearTimeout(timer);
    }, [notFound]);

    if (notFound) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-gray-500 text-sm">No registration data found.</p>
                    <p className="text-gray-400 text-xs">Redirecting you back...</p>
                </div>
            </div>
        );
    }

    if (!data) return null;


    const formattedDate = data.eventDate
        ? new Date(data.eventDate).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric', weekday: 'long',
        })
        : 'To Be Announced';

    const details = [
        { label: 'Full Name', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Phone', value: data.phone },
        { label: 'Category', value: data.category },
        { label: 'Age', value: data.age },
        { label: 'Address', value: data.address },
        { label: 'Social Link', value: data.socialLink || '—' },
        { label: 'How you heard', value: data.howKnowAboutMic },
        ...(data.anyQues ? [{ label: 'Your Question', value: data.anyQues }] : []),
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Success banner */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white shadow-lg">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">You're Registered!</h1>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-md mx-auto">
                        Thank you for registering{data.tab === 'performer' ? ' as a performer' : ' as audience'} for{' '}
                        <span className="font-semibold text-white">{data.eventTitle}</span>.
                        We're excited to have you with us! 🎤
                    </p>
                </div>

                {/* Event info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-3">Event Details</p>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">{data.eventTitle}</h2>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>📅 {formattedDate}</span>
                        {data.eventTime && <span>⏰ {data.eventTime}</span>}
                        {data.eventVenueAddress && <span>📍 {data.eventVenueAddress}</span>}
                    </div>
                </div>

                {/* Submitted details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-4">Your Submitted Details</p>
                    <div className="space-y-3">
                        {details.map((item) => (
                            <div key={item.label} className="flex gap-3">
                                <p className="text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5">{item.label}</p>
                                <p className="text-sm text-gray-800 font-medium break-all">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confirmation notice */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                    <div className="flex gap-3">
                        <span className="text-xl flex-shrink-0">📧</span>
                        <div>
                            <p className="text-sm font-semibold text-amber-800 mb-1">Confirmation Email Coming Soon</p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                A confirmation of your registration will be sent to{' '}
                                <span className="font-semibold">{data.email}</span> within a few days.
                                Please check your inbox and spam folder. If you don't receive it within 5 days,
                                feel free to reach out to us.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact / queries */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-4">Have Questions?</p>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        If you have any queries regarding your registration or the event, you can reach us through any of the following:
                    </p>
                    <div className="space-y-3">

                        <Link
                            href="mailto:contact.micofmithila@gmail.com"
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">📧</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Email us at</p>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition">contact.micofmithila@gmail.com</p>
                            </div>
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">💬</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Or use our</p>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition">Contact Page</p>
                            </div>
                        </Link>

                        <Link
                            href="https://www.instagram.com/micofmithila"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">📸</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Follow & DM us on</p>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition">Instagram @micofmithila</p>
                            </div>
                        </Link>

                        <Link
                            href="https://www.youtube.com/@micofmithila"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">▶️</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Subscribe to us on</p>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition">YouTube @micofmithila</p>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pb-6">
                    <Link
                        href={`/events/${id}`}
                        className="flex-1 text-center py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-purple-300 hover:text-purple-600 transition bg-white"
                    >
                        ← Back to Event
                    </Link>
                    <Link
                        href="/events"
                        className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-md"
                    >
                        Explore More Events
                    </Link>
                </div>

            </div>
        </div>
    );
}