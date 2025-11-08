import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

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
    member.social?.youtube ||
    member.social?.linkedin;

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

          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Linkedin"
            >
              <FaLinkedin size={20} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default CrewCard