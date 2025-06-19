export default function AudienceReviews({reviews = []}) {  
    return (
      <section className="py-12 bg-gradient-to-br from-blue-100 via-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">💬 Audience Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={r.image} alt={r.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg font-semibold">{r.name}</h4>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{r.review}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  