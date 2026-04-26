export default function PageHero({ label, title, highlight, description }) {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-6 sm:py-8 text-center px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {label && (
          <span className="inline-block bg-white border border-purple-100 text-purple-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
            {label}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
          {title}{' '}
          {highlight && (
            <span
              style={{
                background: 'linear-gradient(to right, #4338ca, #8b2ed3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {highlight}
            </span>
          )}
        </h1>
        {description && (
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}