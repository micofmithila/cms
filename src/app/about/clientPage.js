'use client'
import PageHero from '@/components/Ui/PageHero';
import Image from 'next/image';

export default function AboutUsClient() {
  let founderImg = '/images/founder.png'
  let directorImg = '/images/director.png'
  let pastEventImg = 'https://res.cloudinary.com/shivanshucloud/image/upload/v1750269768/micofmithila/gallery/rr7vfui7l1zgmalksrdf.jpg'
  let journeyImg = 'https://res.cloudinary.com/shivanshucloud/image/upload/v1750271374/micofmithila/gallery/kcdk6izk5jdyyk2o9p3k.jpg'
  let visionImg = 'https://res.cloudinary.com/shivanshucloud/image/upload/v1750271351/micofmithila/gallery/xjkxedb1uoagparkzfqc.jpg'
  let crewImg = 'https://res.cloudinary.com/shivanshucloud/image/upload/v1750271350/micofmithila/gallery/pf2glqwzgeuyqokyuyb5.jpg'
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <PageHero
  label="Our Story"
  title="About"
  highlight="Us"
  description="A revolution in the heart of Mithila to empower voices through the art of storytelling, poetry, music, and expression."
/>


      {/* Section: How it all began */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={journeyImg} alt="Journey Begins" className="rounded-xl shadow-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">How It All Began</h2>
          <p className="text-gray-700 leading-relaxed">
            MIC of Mithila was born from a simple idea — to give a stage to the unheard voices of Mithila. It started as a small gathering in Madhubani and soon transformed into a vibrant platform for youth, artists, and creators to express themselves freely.
          </p>
        </div>
      </section>

      {/* Section: What Impact It Created */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center bg-gray-50">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">A Cultural Revolution</h2>
          <p className="text-gray-700 leading-relaxed">
            By organizing over dozens of successful open mic events, we’ve created not just performances but a cultural movement. We reintroduced the spirit of art in Mithila, nurtured talent, and brought attention to local voices.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img src={pastEventImg} alt="Past Event" className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Section: Supporters & Crew */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={crewImg} alt="Crew" className="rounded-xl shadow-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">Backbone of MIC – Our Crew</h2>
          <p className="text-gray-700 leading-relaxed">
            From ideation to execution, our dedicated crew has been the real soul behind MIC. Each member brought energy, ideas, and love for Mithila’s art and culture.
          </p>
        </div>
      </section>

      {/* Section: The Founders */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-12">Meet the Visionaries</h2>
        <div className="grid md:grid-cols-2 gap-12 text-center">
          <div>
            <img src={founderImg} alt="Sharda Jha" className="w-48 h-48 mx-auto rounded-full shadow-lg mb-4" />
            <h3 className="text-xl font-bold">Sharda Jha</h3>
            <p className="text-sm text-gray-600">Founder</p>
          </div>
          <div>
            <img src={directorImg} alt="Dr. Kailash Bhardwaj" className="w-48 h-48 mx-auto rounded-full shadow-lg mb-4" />
            <h3 className="text-xl font-bold">Dr. Kailash Bhardwaj</h3>
            <p className="text-sm text-gray-600">Director</p>
          </div>
        </div>
      </section>

      {/* Section: What To Expect Ahead */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-semibold text-purple-600 mb-4">What to Expect in the Future</h2>
          <p className="text-gray-700 leading-relaxed">
            With every event, we aim to grow bigger and stronger. Expect more cities, more voices, more opportunities, and a bigger revolution that echoes beyond Mithila.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img src={visionImg} alt="Future Vision" className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Section: Why Performers Love MIC */}
      <section className="py-16 px-6 md:px-20 text-center bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Why Performers Love MIC of Mithila</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          MIC of Mithila isn’t just a stage — it’s a spotlight. We provide professional setups, photography, wide social media reach, and an encouraging crowd. Every performer leaves with applause and memories.
        </p>
      </section>
    </main>
  );
}
