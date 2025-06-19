import AudienceReviews from "@/components/HomePage/AudienceReviews";
import FeaturedEventSection from "@/components/HomePage/FeaturedEvent";
import FeaturedImagesSection from "@/components/HomePage/FeaturedImage";
import FeaturedVideo from "@/components/HomePage/FeaturedVideo";
import HeroSection from "@/components/HomePage/Hero";
import TopPerformersSection from "@/components/HomePage/TopPerformers";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredEvent = {
    _id: "event123",
    title: "Mic of Mithila Open Mic Season 3",
    date: "2025-07-20",
    description: "<p>Join us for an amazing open mic filled with music, poetry, and storytelling from talented artists across Mithila!</p>",
    posterUrl:
      "https://res.cloudinary.com/shivanshucloud/image/upload/v1747382806/micofmithila/gallery/egss5900jbk7aq6t7xbm.jpg",
    registrationLink: "#",
  };
  return (
    <div>
      {/* Title & Description */}
      {/* <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Mic Of Mithila</h1>
        <p className="text-lg text-gray-700 mt-2">
          Open Mic platform for the Mithila region, where you can share your voice and connect with others.
        </p>
      </div> */}

      {/* Image Section */}
      {/* <div className="mt-6">
        <Image src="/vercel.svg" alt="Vercel Logo" width={120} height={30} />
      </div> */}

      {/* Call-to-Action Button */}
      {/* <div className="mt-6">
        <Link href={"/dashboard"} className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
          Get Started
        </Link>
      </div> */}

      <HeroSection />
      <FeaturedEventSection event={featuredEvent} />
      <FeaturedImagesSection
        images={[
          "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271351/micofmithila/gallery/xjkxedb1uoagparkzfqc.jpg",
          "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271374/micofmithila/gallery/kcdk6izk5jdyyk2o9p3k.jpg",
          "https://res.cloudinary.com/shivanshucloud/image/upload/v1747382806/micofmithila/gallery/egss5900jbk7aq6t7xbm.jpg",
          "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271350/micofmithila/gallery/pf2glqwzgeuyqokyuyb5.jpg",
          "https://res.cloudinary.com/shivanshucloud/image/upload/v1750269768/micofmithila/gallery/rr7vfui7l1zgmalksrdf.jpg",
        ]}
      />
      <TopPerformersSection
        performers={[
          {
            name: "Ankita Sharma",
            category: "Poet",
            image: "https://example.com/ankita.jpg",
            socials: {
              instagram: "https://instagram.com/ankita.poetry",
              youtube: "https://youtube.com/@ankitasharma",
            },
          },
          {
            name: "Ravi Kumar",
            category: "Singer",
            image: "https://example.com/ravi.jpg",
            socials: {
              instagram: "https://instagram.com/ravi.sings",
              twitter: "https://twitter.com/ravikmusic",
            },
          },
        ]}
      />

      <FeaturedVideo videoLink={"https://www.youtube.com/embed/y8PPIYXOphY?si=g3B94apnV1-r6sWW"} />

      <AudienceReviews reviews={[
        {
          name: "Aarav Mishra",
          role: "Audience Member",
          review: "One of the most heart-touching and powerful open mic events I’ve ever attended. Great initiative by the team!",
          image: "/audience/aarav.jpg",
        },
        {
          name: "Simran Kumari",
          role: "Performer – Poetry",
          review: "The stage at MIC of Mithila gave me a platform to express myself like never before. Felt like home!",
          image: "/audience/simran.jpg",
        },
        {
          name: "Ravi Kumar",
          role: "Parent of Performer",
          review: "My daughter got the confidence to perform in front of an audience for the first time thanks to MIC.",
          image: "/audience/ravi.jpg",
        },
      ]}
      />


    </div>
  );
}
