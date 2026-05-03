import Link from "next/link";
import { FaYoutube, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-blue-950 to-purple-900 text-white px-6 py-8 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src="/logo.jpg" // Replace with actual logo path
                            alt="Mic of Mithila Logo"
                            className="w-12 h-12 object-contain rounded-full border-2 border-white shadow-lg"
                        />
                        <h3 className="text-xl font-bold">Mic Of Mithila</h3>
                    </div>
                    <p className="text-sm text-gray-300">
                        Mic Of Mithila is a stage for emerging talent in Madhubani, Bihar — giving artists a voice and an audience to shine.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/events" className="hover:underline">Events</Link></li>
                        <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/crew" className="hover:underline">Crew Members</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                        <li><Link href="/dashboard" className="hover:underline">Admin Dashboard</Link></li>
                    </ul>
                </div>

                {/* Founder & Director */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Leadership</h4>
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src="/images/founder.png"
                            alt="Founder"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                            <p className="font-medium">Sharda Jha</p>
                            <span className="text-xs text-gray-400">Founder</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/director.png"
                            alt="Director"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                            <p className="font-medium">Dr. Kailash Bhardwaj</p>
                            <span className="text-xs text-gray-400">Director</span>
                        </div>
                    </div>
                </div>

                {/* Contact & Social Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p className="text-sm text-gray-300 mb-4">
                        <FaEnvelope className="inline mr-2" />
                        contact.micofmithila@gmail.com
                    </p>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://youtube.com/@micofmithila" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                            <FaYoutube />
                        </a>
                        <a href="https://instagram.com/micofmithila" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com/micofmithila" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <FaTwitter />
                        </a>
                        {/* Add more socials if needed */}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} Mic Of Mithila. All rights reserved.</p>
                <p>Made with ❤️ by <a href="https://shivanshukarn.github.io/" target="_blank"><u>Shivanshu Karn</u></a></p>
            </div>
        </footer>
    );
};