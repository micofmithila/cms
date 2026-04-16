import Link from "next/link";

export default function HeroSection({ bgImage }) {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open Mic Platform · Madhubani, Bihar
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-5 max-w-4xl">
          Welcome to{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              MIC of Mithila
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base lg:text-lg text-white/75 max-w-xl mx-auto leading-relaxed mb-8 px-2">
          A vibrant stage for Mithila's culture, talent, and expression.
          Join us to perform, connect, and celebrate the art of storytelling.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-none">
          <Link
            href="/events"
            className="px-7 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-xl shadow-lg hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 hover:shadow-yellow-400/30 hover:shadow-xl text-sm sm:text-base"
          >
            Explore Events →
          </Link>
          <Link
            href="/about"
            className="px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-sm sm:text-base"
          >
            Learn More
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
}