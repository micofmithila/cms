import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function TopPerformersSection({ performers = [] }) {
    return (
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
                    🌟 Top Performers
                </h2>

                {/* Grid of Performer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {performers.map((performer, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <img
                                src={performer.image}
                                alt={performer.name}
                                className="w-28 h-28 object-cover rounded-full border-4 border-blue-600 mb-4"
                            />

                            {/* Name & Category */}
                            <h3 className="text-xl font-bold text-gray-800">{performer.name}</h3>
                            <p className="text-sm text-blue-600 font-medium mt-1">{performer.category}</p>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-4 text-xl text-blue-600">
                                {performer.socials.instagram && (
                                    <a href={performer.socials.instagram} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram className="hover:text-pink-500 transition" />
                                    </a>
                                )}
                                {performer.socials.youtube && (
                                    <a href={performer.socials.youtube} target="_blank" rel="noopener noreferrer">
                                        <FaYoutube className="hover:text-red-600 transition" />
                                    </a>
                                )}
                                {performer.socials.twitter && (
                                    <a href={performer.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="hover:text-blue-400 transition" />
                                    </a>
                                )}
                                {performer.socials.linkedin && (
                                    <a href={performer.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="hover:text-blue-700 transition" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}