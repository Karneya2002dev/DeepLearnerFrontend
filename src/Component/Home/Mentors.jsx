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

const roleOptions = ["All", "MERN STACK", "MOBILE APP", "UI/UX", "Digital Marketing", "DATA ANALYSIS"];


export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const sectionRef = useRef(null);

  useEffect(() => {
    axios.get("https://deeplearner-production.up.railway.app/api/mentors")
      .then(res => {
        setMentors(res.data);
        setFilteredMentors(res.data);
        setLoading(false);
      })
      .catch(err => {
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

  // useEffect(() => {
  //   if (selectedRole === "All") {
  //     setFilteredMentors(mentors);
  //   } else {
  //     setFilteredMentors(mentors.filter(m => m.role === selectedRole));
  //   }
  // }, [selectedRole, mentors]);

  if (loading) return <p className="text-center py-20 text-white">Loading mentors...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* <h1 className="mentors-bg text-[8rem] md:text-[14rem] font-extrabold text-gray-800 opacity-10 tracking-widest select-none leading-none">MENTORS</h1> */}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center mb-8 section-heading"
      >
        <h2 className="text-4xl font-bold">Meet Our <span className="text-[#81007f]">Mentors</span></h2>
        <p className="text-gray-400 mt-2">Industry experts guiding your journey.</p>
      </motion.div> 

      {/* Role Filter Dropdown */}
   {/* <div className="relative z-10 flex justify-center mb-12">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 rounded border bg-gray-900 text-white border-gray-700"
        >
          {roleOptions.map((role, idx) => (
            <option key={idx} value={role}>{role}</option>
          ))}
        </select>
      </div>  */}


   <div className="px-6 max-w-7xl mx-auto relative z-10">
        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-400">No mentors found for selected role.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-14"
          >
            {filteredMentors.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mentor-card relative flex flex-col items-center text-center bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-6 h-[380px] w-[280px] mx-auto overflow-hidden border border-gray-700"
                >
                  <motion.img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="mentor-image w-32 h-32 object-cover rounded-full border-4 border-white mb-4" 
                  />
                  <div className="z-10">
                    <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                   
                    <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-pink-500/30 text-pink-400 border border-pink-400">
                      {mentor.role}
                    </span>
                  </div>
                  {!mentor.comingSoon && (
                    <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 text-white hover:text-blue-300 transition">
                      <Linkedin size={22} />
                    </a>
                  )}
                  {mentor.comingSoon && (
                    <span className="absolute top-3 right-3 bg-black text-white text-[10px] px-2 py-1 rounded">Coming Soon</span>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Glow and outline styles */}
      <style>{`
        .mentor-card:hover {
          box-shadow: 0 0 20px #ff2df7, 0 0 30px #ff2df7, 0 0 40px #ff2df7;
          border-color: #ff2df7;
          transition: 0.3s ease-in-out;
        }
        .mentor-image {
          border: 4px solid white;
          transition: 0.3s ease-in-out;
        }
        .mentor-card:hover .mentor-image {
          border-color: #ff2df7;
          box-shadow: 0 0 15px #ff2df7, 0 0 25px #ff6ef7;
        }
      `}</style>
    </section>
  );
}
