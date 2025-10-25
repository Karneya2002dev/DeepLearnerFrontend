import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,Autoplay } from "swiper/modules"; // removed Autoplay
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import divider from '../../assets/divider.png';

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
      .get("https://deeplearnerbackend-production-9217.up.railway.app/api/mentors")
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
      gsap.from(".section-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
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
      <div className="relative z-10 text-center mb-12 section-heading">
        <h2 className="text-4xl font-bold">
          Meet Our <span className="text-[#81007f]">Mentors</span>
        </h2>
        <p className="text-gray-400 mt-2">Our mentor for all courses.</p>
      </div>

      {/* Swiper Slider */}
      <div className="px-6 max-w-7xl mx-auto relative z-10 overflow-visible">
        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-400">No mentors found for selected role.</p>
        ) : (
          <Swiper
  modules={[Pagination, Autoplay]} // ✅ Removed Navigation, added Autoplay
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000, // 3s delay
    disableOnInteraction: false, // keeps autoplay even after user interaction
  }}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  }}
  className="pb-12"
>
            {filteredMentors.map((mentor) => (
              <SwiperSlide key={mentor.id}>
              <div
  className="relative bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center w-full max-w-[250px] mx-auto transition-all duration-300
             hover:border-[#81007f] hover:border-5"
>
  {/* Tick Badge */}
{/* Tick Badge */}
<span
  className="absolute top-2 right-2 flex items-center justify-center text-white text-sm font-bold z-20"
  style={{
    backgroundColor: 'green',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
  }}
>
  ✓
</span>


  {/* Coming Soon */}
  {mentor.comingSoon && (
    <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
      Coming Soon
    </span>
  )}

  {/* Image */}
  {/* Image Wrapper */}
<div className="relative w-full h-74">
  <img
    src={mentor.image || "/placeholder.png"}
    alt={mentor.name}
    className="w-full h-full object-cover bg-white rounded-t-2xl"
  />

  {/* Divider pasted on image (bottom overlay) */}
 <img
  src={divider}
  alt="divider"
  className="absolute -bottom-6.5 left-0 w-full"
/>

</div>


  {/* Info */}
  <div className="p-4 flex items-center justify-between w-full -mt-2">
  <div className="text-left">
    <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
    <p className="text-sm text-gray-300">{mentor.role}</p>
  </div>

  {/* Linkedin */}
  {!mentor.comingSoon && mentor.linkedin && (
    <a
      href={mentor.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#0A66C2] hover:opacity-80"
    >
      <Linkedin size={22} />
    </a>
  )}
</div>

    {/* Linkedin */}
   
</div>


              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
