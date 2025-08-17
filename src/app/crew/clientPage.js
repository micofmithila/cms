'use client';

import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaGlobe, FaFacebook } from 'react-icons/fa';

const crewMembers = [
  {
    name: "Miss Sharda Jha",
    role: "Founder & Lead Organizer",
    description:
      "The driving force behind MOM, blending vision, creativity, and leadership to create memorable events and experiences.",
    imageUrl: "",
    social: {
      instagram: 'https://www.instagram.com/theimaginationgirl',
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Dr. Kailash Bhardwaj",
    role: "Director",
    description:
      "Guiding force behind MOM, ensuring excellence in every event.",
    imageUrl: "", // blank initially
    social: {
      instagram: null,
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Anuj Jha",
    role: "Chief Event Strategist & Lead Coordinator",
    description:
      "Spearheading event planning, strategy, and execution with precision and leadership.",
    imageUrl: "",
    social: {
      instagram: 'https://www.instagram.com/i_m_a_n_u_j',
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Md. Danish Shakil",
    role: "Head of Digital Operations & Social Media Manager",
    description:
      "Overseeing MOM’s digital presence, engagement, and content strategy with full access and responsibility.",
    imageUrl: "",
    social: {
      instagram: 'https://www.instagram.com/vlogger_chhaura',
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Shivanshu Karn",
    role: "Tech & Web Infrastructure Lead",
    description:
      "Architect behind MOM’s digital foundation — from website development to backend systems, ensuring seamless online experience and automation.",
    imageUrl: "",
    social: {
      instagram: 'https://www.instagram.com/shivanshu.karn',
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Prince Raj",
    role: "Creative Director (Graphics & Visual Design)",
    description:
      "Leading MOM’s visual identity, ensuring innovative and impactful design that defines the brand.",
    imageUrl: "",
    social: {
      instagram: null,
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Lakshya Mishra",
    role: "Lead Photographer & Videographer",
    description:
      "Capturing the essence of MOM with every click & frame.",
    imageUrl: "",
    social: {
      instagram: null,
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Rishikesh Mishra",
    role: "Head of Cinematography & Editing",
    description:
      "Brings MOM’s moments to life through impeccable editing.",
    imageUrl: "",
    social: {
      instagram: null,
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
  {
    name: "Mr. Navin Jha",
    role: "Artist Management & Curation Head",
    description:
      "Curating & managing talents to make MOM events unforgettable.",
    imageUrl: "",
    social: {
      instagram: 'https://www.instagram.com/navinjeejha',
      facebook: null,
      twitter: null,
      youtube: null,
      website: null,
    },
  },
];


const CrewCard = ({ member }) => {
  // Initials fallback
  const initials = member.name
    ?.split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const hasAnySocial =
    member.social?.instagram ||
    member.social?.twitter ||
    member.social?.facebook ||
    member.social?.youtube ||
    member.social?.website;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6 flex flex-col items-center text-center">
      {/* Profile Image / Placeholder */}
      <div className="w-28 h-28 mb-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-2xl font-bold">{initials}</span>
        )}
      </div>

      {/* Name + Role */}
      <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
      <p className="text-sm text-blue-600 font-medium">{member.role}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2">{member.description}</p>

      {/* Social Links */}
      {hasAnySocial && (
        <div className="mt-4 flex justify-center gap-4">
          {member.social?.instagram && (
            <a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          )}
          {member.social?.facebook && (
            <a
              href={member.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
          )}
          {member.social?.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-600"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {member.social?.youtube && (
            <a
              href={member.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
          )}
          {member.social?.website && (
            <a
              href={member.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Website"
            >
              <FaGlobe size={20} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const CrewClient = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold">Mic of Mithila – Core Crew</h2>
        <p className="text-gray-600 mt-2">
          The pillars behind MOM’s creativity, execution and success.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {crewMembers.map((member, index) => (
          <CrewCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
};

export default CrewClient;
