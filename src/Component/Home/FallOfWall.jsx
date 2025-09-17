import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ChevronDown, ChevronUp, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

import CoreValues from "./CoreValues";

gsap.registerPlugin(ScrollTrigger);

export default function WallOfLove() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const heartRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRef = useRef(null);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  // Fetch testimonials
  useEffect(() => {
    axios
      .get("https://deeplearner-production.up.railway.app/api/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  // Animations
  useEffect(() => {
    if (heartRef.current) {
      gsap.to(heartRef.current, {
        scale: 1.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

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
  }, [testimonials]);

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
            {/* <source src={bgVideo} type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">
              Stories of{" "}
              <span className="text-[#81007f]">Satisfaction</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Meet our students & hear their success stories.
            </p>

            {/* Heart Divider */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <Heart
                ref={heartRef}
                className="mx-3 text-[#81007f] drop-shadow-lg"
                size={28}
              />
              <div className="flex-1 border-t border-gray-700"></div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, index) => (
              <div
                key={t.id || t.name + index}
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
