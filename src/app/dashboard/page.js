'use client';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="links">
        <div className="my-2">
          <Link href="/dashboard/events" className="text-blue-500 hover:underline">Manage Events</Link>
        </div>
        <div className="my-2">
          <Link href="/dashboard/gallery" className="text-blue-500 hover:underline">Manage Gallery</Link>
        </div>
        <div className="my-2">
          <Link href="/dashboard/contact" className="text-blue-500 hover:underline">Contact Form Submissions</Link>
        </div>
      </div>
    </div>
  );
}
