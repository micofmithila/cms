'use client';
import React, { useEffect, useState } from "react";
import CrewCard from '@/components/Crew/CrewCard';
import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import PageHero from "@/components/Ui/PageHero";


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
    <main className="bg-white text-gray-800">
      <PageHero
        label="Core Crew"
        title="Meet the"
        highlight="Crew"
        description="The pillars behind MOM who make every event possible."
      />

      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? <LoadingSpinner /> : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {crewMembers.map((member, index) => (
              <CrewCard key={index} member={member} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CrewClient;
