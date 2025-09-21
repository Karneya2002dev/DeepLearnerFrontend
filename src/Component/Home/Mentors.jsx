import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

// const roleOptions = ["All", "MERN STACK", "MOBILE APP", "UI/UX", "Digital Marketing", "DATA ANALYSIS"];

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const sectionRef = useRef(null);

  // Fetch mentors
  useEffect(() => {
    axios
      .get("https://deeplearner-production.up.railway.app/api/mentors")
      .then((res) => {
        setMentors(res.data);
        setFilteredMentors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch mentors.");
        setLoading(false);
      });

    const ctx = gsap.context(() => {
      gsap.from(".mentors-bg", { opacity: 0, scale: 0.8, duration: 1.2, ease: "power3.out" });
      gsap.from(".section-heading", { y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter mentors by role
  useEffect(() => {
    if (selectedRole === "All") {
      setFilteredMentors(mentors);
    } else {
      setFilteredMentors(mentors.filter((m) => m.role === selectedRole));
    }
  }, [selectedRole, mentors]);

  if (loading) return <p className="text-center py-20 text-white">Loading mentors...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center mb-12 section-heading"
      >
        <h2 className="text-4xl font-bold">
          Meet Our <span className="text-[#81007f]">Mentors</span>
        </h2>
        <p className="text-gray-400 mt-2">Industry experts guiding your journey.</p>
      </motion.div>

      {/* Swiper Slider */}
      <div className="px-6 max-w-7xl mx-auto relative z-10 overflow-visible">
        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-400">No mentors found for selected role.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 overflow-visible"
          >
            {filteredMentors.map((mentor) => (
              <SwiperSlide key={mentor.id} className="overflow-visible flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mentor-card relative flex flex-col items-center text-center bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-6 min-h-[400px] w-[280px] mx-auto border border-gray-700 overflow-visible"
                >
                  <motion.img
                    src={mentor.image || "/placeholder.png"}
                    alt={mentor.name}
                    className="mentor-image w-32 h-32 object-cover rounded-full border-4 border-white mb-4"
                  />
                  <div className="z-10">
                    <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                    <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#81007f]/30 text-white border border-[#81007f]">
                      {mentor.role}
                    </span>
                  </div>
                  {!mentor.comingSoon && mentor.linkedin && (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-[#0A66C2] hover:text-[#e5cde5] transition"
                    >
                      <Linkedin size={22} />
                    </a>
                  )}
                  {mentor.comingSoon && (
                    <span className="absolute top-3 right-3 bg-black text-white text-[10px] px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Card Hover Styles */}
      <style>{`
        .mentor-card:hover {
          box-shadow: 0 0 25px #81007f, 0 0 40px #81007f, 0 0 60px #81007f;
          border-color: #81007f;
          transition: 0.25s ease-in-out;
        }
        .mentor-image {
          border: 4px solid white;
          transition: 0.25s ease-in-out;
        }
        .mentor-card:hover .mentor-image {
          border-color: #81007f;
          box-shadow: 0 0 20px #81007f, 0 0 35px #81007f;
        }
      `}</style>
    </section>
  );
}
