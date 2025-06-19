export default function FeaturedVideo({ videoLink }) {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-purple-700 mb-6">🎥 Featured Performance</h2>
                <p className="text-gray-600 mb-8">
                    Watch one of the most inspiring performances from our recent open mic. Experience the passion and power of words.
                </p>

                {/* Responsive Video Wrapper */}
                <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        src={videoLink}
                        title="Featured MIC of Mithila Performance"
                        frameBorder="0"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/y8PPIYXOphY?si=g3B94apnV1-r6sWW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */ }