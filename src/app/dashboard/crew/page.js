'use client';
import React, { useEffect, useState } from "react";
import CrewCardAdmin from '@/components/Crew/CrewCardAdmin';
import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import Link from "next/link";

const CrewAdmin = () => {
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
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Core Crew</h1>
                <Link
                    href="/dashboard/crew/add"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:from-blue-700 hover:to-purple-700 transition duration-200"
                >
                    + Add Crew Members
                </Link>
            </div>
            <div className="mb-8">
                <p className="text-gray-600 mt-2">
                    The pillars behind MOM’s creativity, execution and success.
                </p>
            </div>
            {loading ? <LoadingSpinner /> : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {crewMembers.map((member, index) => (
                        <CrewCardAdmin key={index} member={member} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CrewAdmin;
