'use client';
import Link from 'next/link';
import React from 'react';
import { FiGrid, FiImage, FiMail, FiUser } from 'react-icons/fi';
import { MdGroups3 } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";

export default function Dashboard() {
  const sections = [
    {
      name: 'Manage HomePage',
      href: '/dashboard/homepage',
      icon: <FiGrid className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Manage Events',
      href: '/dashboard/events',
      icon: <FiGrid className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Manage Gallery',
      href: '/dashboard/gallery',
      icon: <FiImage className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Contact Form Submissions',
      href: '/dashboard/contact',
      icon: <FiMail className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Manage Crew Members',
      href: '/dashboard/crew',
      icon: <MdGroups3 className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Manage Account',
      href: '/dashboard/profile',
      icon: <FiUser className="text-purple-600 text-2xl" />,
    },
    {
      name: 'Manage Users',
      href: '/dashboard/users',
      icon: <FaUsersCog className="text-purple-600 text-2xl" />,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-purple-700 mb-12">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-center gap-4"
            >
              <div className="p-4 bg-purple-100 rounded-full">
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
                  {section.name}
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-gray-700">
                  Go to {section.name.toLowerCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
