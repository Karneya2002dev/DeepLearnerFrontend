import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";
import logo from '../../assets/loogoo1.png';
import CoreValues from "./CoreValues";

export default function WallOfLove() {
  const [showAll, setShowAll] = useState(false);
  const cardRefs = useRef([]);
  const videoRef = useRef(null);

  const testimonials = [
    {
      review:
        "The Software course at Deep Learner Academy (DLA) helped me gain strong programming skills and confidence to work on live projects. The practical sessions and support were excellent.",
      name: "Meena K",
      role: "Student",
    },
    {
      review:
        "The Python Full Stack course at Deep Learner Academy (DLA) was detailed and focused on real-world projects. The mentors were always available for guidance, and the placement support was invaluable.",
      name: "Prabakaran",
      role: "Student",
    },
    {
      review:
        "The Deep Learner Academy (DLA) MERN Stack course was comprehensive and well-structured. The mentors guided me throughout, and the job assistance was extremely helpful. Highly recommended!",
      name: "Sruthi Selvam",
      role: "Student",
    },
  ];

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  // Animations
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          y: 10,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    if (videoRef.current) {
      gsap.to(videoRef.current, {
        y: 15,
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <>
      <section className="relative bg-black text-white py-16 px-6 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30 rounded-3xl"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">
              Stories of <span className="text-[#81007f]">Satisfaction</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Meet our students & hear their success stories.
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700" />
              <div>
                <img
                  src={logo}
                  alt="Logo"
                  className="mx-2 sm:mx-3 h-6 sm:h-8 w-auto object-contain"
                />
              </div>
              <div className="flex-1 max-w-[120px] sm:max-w-xs border-t border-gray-700" />
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, index) => (
              <div
                key={t.name + index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-1 text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                  </div>
                  <span className="flex items-center text-green-400 text-sm">
                    <CheckCircle2 size={16} className="mr-1" /> Verified
                  </span>
                </div>
                <p className="text-gray-300 mt-3 text-sm">{t.review}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="bg-[#81007f] w-10 h-10 flex items-center justify-center rounded-full font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less */}
          {testimonials.length > 3 && (
            <div className="flex justify-center mt-10">
              <motion.div
                onClick={() => setShowAll(!showAll)}
                className="cursor-pointer p-3 bg-[#81007f] hover:bg-[#81007f]/90 rounded-full shadow-lg"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {showAll ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
              </motion.div>
            </div>
          )}
        </div>
      </section>
      <CoreValues />
    </>
  );
}
