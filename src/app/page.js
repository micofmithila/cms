'use client'
import AudienceReviews from "@/components/HomePage/AudienceReviews";
import FeaturedEventSection from "@/components/HomePage/FeaturedEvent";
import FeaturedImagesSection from "@/components/HomePage/FeaturedImage";
import FeaturedVideo from "@/components/HomePage/FeaturedVideo";
import HeroSection from "@/components/HomePage/Hero";
import TopPerformersSection from "@/components/HomePage/TopPerformers";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/Ui/LoadingSpinner";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [heroSectionImage, setHeroSectionImage] = useState("https://res.cloudinary.com/shivanshucloud/image/upload/v1750271374/micofmithila/gallery/kcdk6izk5jdyyk2o9p3k.jpg")

  const [featuredEvent, setFeaturedEvent] = useState(null)

  const [featuredImages, setFeaturedImages] = useState([
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380971/micofmithila/gallery/w6bysrrccwdhlvml1jtt.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380970/micofmithila/gallery/licwpmdeaba1ztj4xsym.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380972/micofmithila/gallery/n6xp5oztjzktcwluzjio.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380974/micofmithila/gallery/nspoybkurfag30xijfv6.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271350/micofmithila/gallery/pf2glqwzgeuyqokyuyb5.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381445/micofmithila/gallery/msdtp57hy8pmlvmc4p7b.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381869/micofmithila/gallery/tqcbvdxs8bh4bpmavmqk.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753382076/micofmithila/gallery/q875mpjmxgdogyvvrsyx.jpg"
  ])

  const [featuredPerformers, setFeaturedPerformers] = useState([
    {
      name: "Nikhil Kumar Jha",
      category: "Maithili Poetry",
      image: "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380171/micofmithila/gallery/hkx7m77vjdsewywinunl.jpg",
      socials: {
        instagram: "",
        twitter: "",
      },
    },
    {
      name: "Harsh Arya",
      category: "Rapsong",
      image: "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380169/micofmithila/gallery/y6nyfw9ee17u0r8af1wx.jpg",
      socials: {
        instagram: "",
        youtube: "",
      },
    },
    {
      name: "Divyanshi Jha",
      category: "Singing",
      image: "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381443/micofmithila/gallery/ugpwqkshjtq0hqmfrbul.jpg",
      socials: {
        instagram: "",
        twitter: "",
      },
    },
    {
      name: "Aman Kumar Jha",
      category: "Storytelling",
      image: "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381441/micofmithila/gallery/c8kqvj1qgccgrfuqamwd.jpg",
      socials: {
        instagram: "",
        twitter: "",
      },
    },
  ])

  const [featuredVideo, setFeaturedVideo] = useState("https://www.youtube.com/embed/y8PPIYXOphY?si=g3B94apnV1-r6sWW")

  const [featuredReviews, setFeaturedReviews] = useState([
    {
      name: "Mohan Kumar Jha",
      role: "Mithilanchal Chamber of Commerce and Industry Foundation",
      review: "माइक ऑफ मिथिला के पूरा टीम के बहुत रास आशीर्वाद! अप्पन संस्कृति के संवर्धन आ संरक्षण लेल उठायल गेल ई डेग अत्यंत सराहनीय अछि। शारदा के बहुत बधाई, कम उम्र में वाइब्रेंट सोच लेल।",
    },
    {
      name: "Daisy Jha",
      role: "Teacher",
      review: "I see Mic of Mithila from the start. Every time new people come and do amazing poetry, rap, and story. Sometimes funny, sometimes emotional. I feel very happy to watch this. This is a good platform for local talent. I wish it would grow more and more.",
    },
    {
      name: "Shreyash Raj Vatsa",
      role: "Student",
      review: "Pehli baar kisi aise show mein gaya jahan sab kuch apna laga. Har performance aise lag raha tha jaise kisi ne apna dil rakh diya ho mic par. Mujhe laga tha bore hoga, par ab lagta hai har baar MOM ka episode miss nahi karna chahiye. Apne sheher ka show, apni bhasha, apne log, sab kuch mast tha!",
    },
  ])

  useEffect(() => {
    fetch("/api/homepage")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch homepage data");
        }

        return res.json();
      })
      .then((data) => {
        setHeroSectionImage(data.heroImages?.[0] || "");

        setFeaturedEvent(data.featuredEventId || null);

        setFeaturedImages(
          (data.featuredImages || []).map((image) => image.imageUrl)
        );

        setFeaturedPerformers(data.topPerformers || []);

        setFeaturedVideo(
          data.featuredVideos?.[0]?.youtubeUrl || ""
        );

        setFeaturedReviews(data.reviews || []);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage contents", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeroSection bgImage={heroSectionImage} />

      {featuredEvent && (
        <FeaturedEventSection featuredEvent={featuredEvent} />
      )}

      <FeaturedImagesSection images={featuredImages} />

      <TopPerformersSection performers={featuredPerformers} />

      <FeaturedVideo videoLink={featuredVideo} />

      <AudienceReviews reviews={featuredReviews} />
    </div>
  );
}
