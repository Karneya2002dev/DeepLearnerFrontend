// src/components/HeroSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../../assets/size (1).jpeg";
import img2 from "../../assets/4.jpeg";
import img3 from "../../assets/size (3).jpeg";

const bgUrl =
  "https://www.open.edu.au/api/cms-image?name=/-/media/study-online/2023/level-2-study-online-pages/programming-coding/programming-coding---study-online-banner.ashx&w=3840&ts=1710462781079&q=75";

const courses = [
  { id: 1, title: "Online Classes", image: img3, topics: null },
  { id: 2, title: "Offline Classes", image: img1, topics: null },
  { id: 3, title: "Internship", image: img2, topics: null },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(courses[0].id);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      className="relative text-white min-h-screen flex flex-col overflow-hidden bg-cover bg-center "
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/95 z-0"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-center justify-center flex-1 relative z-10 py-12 lg:py-20 gap-10 mt-10">
        
        {/* ✅ Left Text Section: Removed 'top-10' and 'justify-between' dependency */}
        <div className="w-full lg:w-1/2 max-w-2xl space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-[#c9c9c9] animate-glow">Learn Today,</span>
              <br />
              <span className="bg-gradient-to-r from-[#81007f] via-pink-500 to-[#81007f] bg-clip-text text-transparent animate-shine">
                Lead Tomorrow
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg">
              At <span className="font-semibold text-[#a832a4]">DeepLearner Academy</span>, we empower
              students with hands-on IT training. Whether you’re starting or advancing, 
              we help you <span className="font-semibold">learn today</span> and 
              <span className="font-semibold"> lead tomorrow</span>.
            </p>

            <div className="mt-8">
              <button
                onClick={() => navigate("/courses")}
                className="px-8 py-3 rounded-full font-bold text-white bg-[#81007f] hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Courses
              </button>
            </div>
          </motion.div>
        </div>

        {/* ✅ Right Side Zig-Zag Course Cards */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <motion.div
            className="flex gap-2 sm:gap-4 items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {courses.map((course, index) => {
              const isExpanded = hoveredCard === course.id || selectedCard === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCard(course.id)}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-2xl shadow-2xl
                    ${isExpanded 
                      ? "w-40 h-64 sm:w-60 sm:h-80 md:w-72 md:h-[450px]" 
                      : "w-14 h-56 sm:w-20 sm:h-80 md:w-24 md:h-[450px]"
                    }
                    ${index % 2 === 0 ? "translate-y-4" : "-translate-y-4"}
                  `}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay for better text visibility */}
                  <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors`} />

                  {/* 🔹 Title Logic */}
                  <div
                    className={`absolute bottom-5 left-3 sm:left-5 text-white transition-all duration-500
                      ${isExpanded
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 origin-bottom-left opacity-70 scale-90"
                      }`}
                
                  >
                    <h3 className="font-bold text-sm sm:text-xl whitespace-nowrap drop-shadow-md">
                      {course.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;