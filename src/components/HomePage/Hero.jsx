import Link from "next/link";

export default function HeroSection({bgImage}) {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-800/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                        Welcome to <span className="text-yellow-300">MIC of Mithila</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto text-white/90 mb-6 px-2">
                        A vibrant stage for Mithila’s culture, talent, and expression. Join us to perform, connect, and celebrate!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/events"
                            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
                        >
                            Explore Events
                        </Link>
                        <Link
                            href="/about"
                            className="px-6 py-3 border border-white font-medium rounded-lg hover:bg-white hover:text-purple-700 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
