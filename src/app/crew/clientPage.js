'use client';
import React, { useEffect, useState } from "react";
import CrewCard from '@/components/Crew/CrewCard';
import LoadingSpinner from "@/components/Ui/LoadingSpinner";


const CrewClient = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crew")
      .then((res) => res.json())
      .then((data) => {
        setCrewMembers(data.crew);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch crew", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold">Core Crew</h2>
        <p className="text-gray-600 mt-2">
          The pillars behind MOM’s creativity, execution and success.
        </p>
      </header>
      {loading ? <LoadingSpinner /> : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {crewMembers.map((member, index) => (
            <CrewCard key={index} member={member} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CrewClient;
