import AudienceReviews from "@/components/HomePage/AudienceReviews";
import FeaturedEventSection from "@/components/HomePage/FeaturedEvent";
import FeaturedImagesSection from "@/components/HomePage/FeaturedImage";
import FeaturedVideo from "@/components/HomePage/FeaturedVideo";
import HeroSection from "@/components/HomePage/Hero";
import TopPerformersSection from "@/components/HomePage/TopPerformers";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const heroSectionImage = "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271374/micofmithila/gallery/kcdk6izk5jdyyk2o9p3k.jpg"

  const featuredEvent = {
    "_id": "6891c8600a0d4288ef63ec01",
    "title": "🎤 Mic of Mithila – Episode 4 | Coming Soon",
    "desc": "\u003Ch2\u003E\u003Cstrong\u003EDear Performer,\u003C/strong\u003E\u003C/h2\u003E\u003Cp\u003EWe’re beyond excited to unveil \u003Cstrong\u003EEpisode 4\u003C/strong\u003E of \u003Cem\u003EMic of Mithila\u003C/em\u003E — a soulful stage that celebrates \u003Cstrong\u003Ecreativity, culture, and unfiltered expression\u003C/strong\u003E.\u003C/p\u003E\u003Cp\u003EThis edition is all about the most cherished emotion of all — \u003Cstrong\u003ELove\u003C/strong\u003E.\u003C/p\u003E\u003Cp\u003EBecause this is the \u003Cstrong\u003EMonth of Love\u003C/strong\u003E:\u003C/p\u003E\u003Cp\u003E❤️ \u003Cstrong\u003ELove for the Nation\u003C/strong\u003E – \u003Cem\u003EIndependence Day\u003C/em\u003E\u003C/p\u003E\u003Cp\u003E💛 \u003Cstrong\u003ELove for Siblings\u003C/strong\u003E – \u003Cem\u003ERaksha Bandhan\u003C/em\u003E\u003C/p\u003E\u003Cp\u003E💙 \u003Cstrong\u003ELove for the Divine &amp; Beloved\u003C/strong\u003E – \u003Cem\u003EJanmashtami\u003C/em\u003E\u003C/p\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E\u003Ch2\u003E\u003Cstrong\u003E\"Coming This August\"\u003C/strong\u003E\u003C/h2\u003E\u003Ch3\u003E🎟️ \u003Cstrong\u003EEntry:\u003C/strong\u003E Just bring your smile! \u003Cem\u003E(Free Registration | Free Entry)\u003C/em\u003E\u003C/h3\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E\u003Cp\u003ESo whether you spin verses of poetry, bring characters to life through storytelling or mimicry, crack up the crowd with stand-up, or have a unique act that deserves the spotlight — this is your moment to shine.\u003C/p\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E\u003Cp\u003E\u003Cstrong\u003ERegistrations haven’t opened yet\u003C/strong\u003E — but keep an eye out! We’ll announce soon so you can claim your spot.\u003C/p\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E\u003Cp\u003ELet your voice, wit, and performance be the echo of love we all celebrate.\u003C/p\u003E\u003Cp\u003EWe can't wait to feel your vibe on stage.\u003C/p\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E\u003Cp\u003E\u003Cstrong\u003ESee you soon!\u003C/strong\u003E\u003C/p\u003E\u003Cp\u003E📧 For any queries: \u003Ca href=\"https://www.micofmithila.in/contact\" rel=\"noopener noreferrer\" target=\"_blank\"\u003Emicofmithila.in/contact\u003C/a\u003E or \u003Ca href=\"mailto:micofmithila@gmail.com\" rel=\"noopener noreferrer\" target=\"_blank\"\u003Emicofmithila@gmail.com\u003C/a\u003E\u003C/p\u003E",
    "theme": "Love",
    "posterUrl": "https://res.cloudinary.com/shivanshucloud/image/upload/v1754383716/micofmithila/gallery/zabothoi9kgmralytj3w.jpg",
    "imagesArray": [],
    "chiefGuests": [],
    "registrationLimit": 100,
    "registrationFee": 0,
    "isRegistrationOpen": false,
    "eventDate": null,
    "eventTime": "",
    "eventVenueAddress": "To be announced",
    "status": "upcoming",
    "createdBy": "68033c401f4d651a19d44f0f",
    "createdAt": "2025-08-05T09:01:20.070Z",
    "__v": 0
  };

  const featuredImages = [
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380971/micofmithila/gallery/w6bysrrccwdhlvml1jtt.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380970/micofmithila/gallery/licwpmdeaba1ztj4xsym.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380972/micofmithila/gallery/n6xp5oztjzktcwluzjio.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753380974/micofmithila/gallery/nspoybkurfag30xijfv6.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1750271350/micofmithila/gallery/pf2glqwzgeuyqokyuyb5.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381445/micofmithila/gallery/msdtp57hy8pmlvmc4p7b.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753381869/micofmithila/gallery/tqcbvdxs8bh4bpmavmqk.jpg",
    "https://res.cloudinary.com/shivanshucloud/image/upload/v1753382076/micofmithila/gallery/q875mpjmxgdogyvvrsyx.jpg"
  ]

  const featuredPerformers = [
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
  ]

  const featuredVideo = "https://www.youtube.com/embed/y8PPIYXOphY?si=g3B94apnV1-r6sWW";

  const featuredReviews = [
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
      name: "Shreyash Raj Vatsa,",
      role: "Student",
      review: "Pehli baar kisi aise show mein gaya jahan sab kuch apna laga. Har performance aise lag raha tha jaise kisi ne apna dil rakh diya ho mic par. Mujhe laga tha bore hoga, par ab lagta hai har baar MOM ka episode miss nahi karna chahiye. Apne sheher ka show, apni bhasha, apne log, sab kuch mast tha!",
    },
  ]
  return (
    <div>
      <HeroSection bgImage={heroSectionImage} />
      <FeaturedEventSection event={featuredEvent} />
      {/* <FeaturedEventSection /> */}
      <FeaturedImagesSection images={featuredImages} />
      <TopPerformersSection performers={featuredPerformers} />
      <FeaturedVideo videoLink={featuredVideo} />
      <AudienceReviews reviews={featuredReviews} />
    </div>
  );
}
